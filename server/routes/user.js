// ========== 步骤 2：引入依赖 ==========
// 用 express 的 Router 把「用户相关路由」挂在一起，最后在 app.js 里一次性挂载
const express = require('express');
const router = express.Router();

// User 模型：从 models 里拿，后面用来「查是否已有该用户名」和「创建新用户」
const { User } = require('../models');
// bcrypt：用来把明文密码加密成密文再存库，不能存明文
const bcrypt = require('bcrypt');
// jsonwebtoken：登录成功后生成 token，前端带 token 请求时用于校验身份
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my_mall_secret_key_2026';  // 生产环境应放环境变量 process.env.JWT_SECRET

// ========== 注册接口：POST /register（挂到 app 上时会变成 POST /api/user/register）==========
router.post('/register', async (req, res) => {
  try {
    // 1. 从请求体里取出前端发来的 username、password、email（email 可选）
    const { username, password, email } = req.body;

    // 2. 简单校验：用户名和密码必填
    if (!username || !password) {
      return res.status(400).json({
        code: 1,
        message: '用户名和密码不能为空'
      });
    }

    // 3. 查数据库：这个用户名是不是已经被人注册过了？
    const existUser = await User.findOne({
      where: { username }
    });
    if (existUser) {
      return res.status(400).json({
        code: 1,
        message: '用户名已存在'
      });
    }

    // 4. 密码加密：bcrypt.hash(明文, 盐的轮数)，返回的是 Promise，所以用 await
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. 往 users 表里插入一条新用户：密码存的是加密后的，不存明文
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email: email || null
    });

    // 6. 返回成功：按学习指南格式，code 0 表示成功，data 里只返回 id 和 username，不把 password 给前端
    res.json({
      code: 0,
      message: '注册成功',
      data: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (err) {
    console.error('注册失败', err);
    res.status(500).json({
      code: 1,
      message: '注册失败，请稍后重试'
    });
  }
});

// ========== 任务四：登录接口 POST /login（完整路径 POST /api/user/login）==========
router.post('/login', async (req, res) => {
  try {
    // 1. 从请求体取出前端发来的用户名和密码
    const { username, password } = req.body;

    // 2. 简单校验：两个都不能为空
    if (!username || !password) {
      return res.status(400).json({
        code: 1,
        message: '用户名和密码不能为空'
      });
    }

    // 3. 根据用户名查用户。await 表示等数据库查完再往下执行
    const user = await User.findOne({
      where: { username }
    });

    // 4. 没查到说明用户名不存在，直接返回「用户名或密码错误」（不单独说「用户不存在」更安全）
    if (!user) {
      return res.status(400).json({
        code: 1,
        message: '用户名或密码错误'
      });
    }

    // 5. 用 bcrypt.compare(用户输入的明文, 库里存的密文) 校验密码是否一致
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        code: 1,
        message: '用户名或密码错误'
      });
    }

    // 6. 登录成功：生成 JWT，返回用户信息 + token（前端带 token 请求需登录的接口）
    const userInfo = user.toJSON();
    delete userInfo.password;

    const token = jwt.sign(
      { id: userInfo.id, username: userInfo.username },
      JWT_SECRET,
      { expiresIn: '7d' }  // token 7 天有效
    );

    res.json({
      code: 0,
      message: '登录成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        token
      }
    });
  } catch (err) {
    console.error('登录失败', err);
    res.status(500).json({
      code: 1,
      message: '登录失败，请稍后重试'
    });
  }
});

// 把 router 导出，给 app.js 用 app.use('/api/user', userRoutes) 挂载
module.exports = router;
