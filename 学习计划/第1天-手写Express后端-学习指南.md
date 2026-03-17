# 第 1 天学习指南：手写 Express 后端与 Hello 接口

> 目标：你自己能说清「每个文件、每一行在干什么」，并且能**亲手**再写一个类似的小服务。

---

## 一、先搞清三件事

### 1. 后端在这里干什么？

- 前端（Vue）跑在浏览器里，负责页面和点击。
- 后端（Node + Express）跑在你的电脑上，监听一个**端口**（比如 3000），别人访问 `http://localhost:3000/xxx` 时，由它决定返回什么。
- 「接口」= 一个 URL + 一种请求方式（GET/POST）+ 返回的数据。例如：`GET /api/hello` 返回 `{ message: 'Hello World' }`。

### 2. 我们手写出来的结构长什么样？

```
server/
├── package.json   ← 项目说明 + 依赖（express）+ 启动命令
├── app.js         ← 真正的代码：创建服务、定义接口、监听端口
├── models/        ← 先空着，后面放 Sequelize 模型
├── routes/        ← 先空着，后面把接口拆到这里
└── middlewares/   ← 先空着，后面放登录校验等
```

### 3. 跑起来的流程（你要能复述）

1. 在 `server` 目录执行 `npm install` → 安装 express。
2. 执行 `npm start`（即 `node app.js`）→ 运行 app.js。
3. app.js 里 `app.listen(3000)` → 程序一直不退出，在 3000 端口等着。
4. 你在浏览器打开 `http://localhost:3000/api/hello` → 请求到了你的电脑 → Express 匹配到 `GET /api/hello` → 执行对应的函数 → 把返回值发回浏览器。

---

## 二、逐行看懂 app.js

打开 `server/app.js`，对照下面看（可以边看边在代码里加注释）。

```js
const express = require('express');
```

- **在干什么**：从 npm 装好的 `express` 包里，把「创建应用」的能力拿进来。
- **类比**：像在 Vue 里 `import Vue from 'vue'`，这里是用 Node 的 `require` 语法。

```js
const app = express();
```

- **在干什么**：创建一个「Express 应用」对象，后面所有路由、中间件都挂在这个 `app` 上。
- **记住**：一个项目通常就这一个 `app`。

```js
const PORT = 3000;
```

- **在干什么**：服务要监听的端口。浏览器访问时用 `http://localhost:3000`。

```js
app.use(express.json());
```

- **在干什么**：加一个「中间件」，把请求体里的是 JSON 的自动解析成对象，后面用 `req.body` 就能拿到。
- **什么时候用**：你写 POST 接口（比如注册、登录）时会用 `req.body`，所以先写上没问题。

```js
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello World',
    from: 'Express 后端'
  });
});
```

- **在干什么**：注册一个**路由**：当有人用 **GET** 方法请求 **/api/hello** 时，执行这个函数。
- **req**：请求（里面可以有 query、body、params 等，后面会用到）。
- **res**：响应。`res.json(对象)` 会把这个对象转成 JSON 并返回，并自动设置 `Content-Type: application/json`。
- **你改一下**：把 `message` 改成 `'你好，女人街'`，保存，重启 `npm start`，再访问看看。

```js
app.get('/', (req, res) => {
  res.send('<p>...</p>');
});
```

- **在干什么**：再注册一个路由，GET 请求 **/** 时返回一段 HTML。`res.send` 可以发字符串（HTML/文本）。
- **和 res.json 的区别**：`res.json` 专门发 JSON；`res.send` 发任意内容，Express 会推断类型。

```js
app.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
});
```

- **在干什么**：让 `app` 在 3000 端口**开始监听**。有请求进来就会按你定义的 `app.get` / `app.post` 去匹配。第二个参数是「启动成功后」执行的回调，这里只是打印一句提示。

---

## 三、package.json 在干什么？

打开 `server/package.json`：

- **dependencies**：项目依赖。这里只有 `express`，所以必须先在 `server` 目录执行一次 `npm install`，否则 `require('express')` 会报错。
- **scripts.start**：执行 `npm start` 时，实际跑的是 `node app.js`，即用 Node 运行你的 `app.js`。

你不需要背下来，但要知道：**装依赖在 server 里 npm install，启动用 npm start**。

---

## 四、你自己动手做一遍（必做）

按下面步骤做，做完才算「今天的内容会了」。

### 步骤 1：先停掉当前后端（如果正在跑）

在跑后端的终端里按 `Ctrl + C` 停掉。

### 步骤 2：新建一个练习目录，从零写

1. 在项目里新建一个文件夹，例如：`server_practice`（和 `server` 同级）。
2. 在 `server_practice` 里新建 `package.json`，内容写成：

```json
{
  "name": "practice",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

1. 在该目录打开终端，执行：

```bash
npm install
```

1. 新建 `app.js`，**不要复制粘贴**，自己照着打（或默写）这几行：
  - `require('express')`，创建 `app`
  - 定义一个 `GET /api/hello`，用 `res.json` 返回 `{ msg: '我写的' }`
  - `app.listen(3000)`，并在回调里 `console.log` 一句
2. 运行：

```bash
npm start
```

1. 浏览器打开 `http://localhost:3000/api/hello`，能看到 `{ msg: '我写的' }` 就对了。

### 步骤 3：加一个你自己想出来的接口

在同一个 `app.js` 里再写一个接口，例如：

- `GET /api/time` → 返回 `{ time: new Date().toLocaleString() }`（当前时间）
- 或 `GET /api/echo?name=xxx` → 返回 `{ name: req.query.name }`（体会一下 `req.query`）

写完后重启 `npm start`，在浏览器里访问你写的 URL，确认返回正确。

### 步骤 4：用一句话说清楚

能回答这两句，说明今天的内容你掌握了：

1. **「GET 和 POST 在 Express 里怎么定义？」**
  答：用 `app.get('路径', 回调)` 和 `app.post('路径', 回调)`。
2. **「浏览器访问 [http://localhost:3000/api/hello](http://localhost:3000/api/hello) 时，是哪一行代码在干活？」**
  答：`app.get('/api/hello', ...)` 里那个回调函数，尤其是里面的 `res.json(...)`。

---

## 五、小结：今天你要会的事


| 你会了                                           | 说明               |
| --------------------------------------------- | ---------------- |
| 后端是「监听端口 + 按 URL 返回数据」                        | 理解前后端分工          |
| `express()`、`app.get`、`res.json`、`app.listen` | 能默写一个最小 Hello 接口 |
| 在单独目录里 `npm install` + `npm start`            | 能自己起一个练习项目       |
| `req.query` 是 URL 里 `?key=value` 的解析结果        | 为后面「列表、搜索」打基础    |


练习目录 `server_practice` 做完可以保留也可以删，正式开发继续用 `server` 目录即可。明天我们会在这个 `server` 里接 MySQL、写注册登录接口。

---

如果你某一步卡住（比如报错、不知道写哪），把**哪一步、报错内容或当前代码**发给我，我按步骤带你排查。