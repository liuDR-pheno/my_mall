// ========== 商品相关路由：列表、详情 ==========
const express = require('express');
const router = express.Router();

// Goods 模型：用来查商品列表、按 id 查详情
const { Goods } = require('../models');

// ========== 任务五：商品列表接口 GET /list（支持分页、关键词搜索、价格排序）==========
// 示例：GET /api/goods/list?limit=10&offset=0&keyword=xxx&sort=price_asc
const { Op } = require('sequelize');

router.get('/list', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const offset = parseInt(req.query.offset, 10) || 0;
    const keyword = (req.query.keyword || '').trim();
    const sort = req.query.sort || 'id_asc'; // price_asc | price_desc | id_asc

    const where = {};
    if (keyword) {
      where.name = { [Op.like]: `%${keyword}%` };
    }

    const orderMap = {
      price_asc: [['price', 'ASC']],
      price_desc: [['price', 'DESC']],
      id_asc: [['id', 'ASC']]
    };
    const order = orderMap[sort] || orderMap.id_asc;

    const { count } = await Goods.findAndCountAll({ where });

    const list = await Goods.findAll({
      where,
      order,
      limit,
      offset
    });

    res.json({
      code: 0,
      data: list,
      total: count
    });
  } catch (err) {
    console.error('商品列表查询失败', err);
    res.status(500).json({
      code: 1,
      message: '获取商品列表失败，请稍后重试'
    });
  }
});

// ========== 任务六：商品详情接口 GET /:id（完整路径 GET /api/goods/1、/api/goods/2 ...）==========
// :id 是动态参数，前端请求 /api/goods/3 时，req.params.id 就是 '3'
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // 1. 用 findByPk(主键值) 根据主键查一条商品；没查到返回 null
    const goods = await Goods.findByPk(id);

    // 2. 不存在则返回失败，和学习指南约定一致
    if (!goods) {
      return res.status(404).json({
        code: 1,
        message: '商品不存在'
      });
    }

    // 3. 存在则返回商品详情（含 id、name、price、image、description、stock 等）
    res.json({
      code: 0,
      data: goods
    });
  } catch (err) {
    console.error('商品详情查询失败', err);
    res.status(500).json({
      code: 1,
      message: '获取商品详情失败，请稍后重试'
    });
  }
});

module.exports = router;
