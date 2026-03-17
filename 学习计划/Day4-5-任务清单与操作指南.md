# 第4~5天：前端登录注册与路由 - 任务清单与操作指南

## 一、任务清单

### 任务1：配置 Vue Router

- 配置路由：首页、登录、注册、商品列表、商品详情、购物车、个人中心等
- 对应路径建议：
  - 首页：`/` 或 `/home`
  - 登录：`/login`
  - 注册：`/register`
  - 商品列表：`/goods` 或 `/products`
  - 商品详情：`/goods/:id`
  - 购物车：`/cart`
  - 个人中心：`/user` 或 `/profile`
- 在 `router/index.js` 中定义路由，在 `App.vue` 中使用 `<router-view>`
- 可选：为需登录的页面配置路由元信息 `meta: { requiresAuth: true }`

### 任务2：开发登录、注册页面

- 登录页：表单字段（用户名/手机号、密码）→ 提交调用后端 `POST /api/user/login`
- 注册页：表单字段（用户名、密码、确认密码、手机号等）→ 提交调用 `POST /api/user/register`
- 表单需做基础校验（必填、格式、密码一致性等）
- 接口成功后：登录页跳转首页/个人中心；注册页跳转登录页

### 任务3：用 Vuex 管理用户状态与登录态判断

- 在 Vuex 中存储 `token` 和 `user`（用户名、ID 等）
- 提供 actions：`login`、`logout` 等；登录成功后保存到 state，并持久化到 `localStorage`
- 在 `router.beforeEach` 中判断访问的页面是否需要登录（`meta.requiresAuth`）
- 未登录时访问需登录页面 → 重定向到 `/login`
- 在导航栏根据 `store.state.user` 显示用户名或「登录/注册」入口

---

## 二、操作步骤明细（建议顺序）


| 步骤  | 操作                                                      |
| --- | ------------------------------------------------------- |
| 1   | 安装 Vue Router：`npm install vue-router`                  |
| 2   | 创建 `router/index.js`，配置所有路由及对应组件                        |
| 3   | 在 `main.js` 中挂载 router                                  |
| 4   | 在 `App.vue` 中添加 `<router-view>`，确保能正常切换页面               |
| 5   | 创建 `views/Login.vue`、`views/Register.vue` 组件            |
| 6   | 实现登录/注册表单、校验、提交逻辑                                       |
| 7   | 使用 axios 调用后端登录/注册接口                                    |
| 8   | 安装 Vuex：`npm install vuex`                              |
| 9   | 创建 `store/index.js`，定义 user 模块（state、mutations、actions） |
| 10  | 在 `router/index.js` 中添加 `beforeEach` 守卫，实现登录态判断         |
| 11  | 在导航栏/头部根据 store 中的 user 显示用户名或登录/注册按钮                   |
| 12  | 联调后端接口，测试注册→登录→显示用户名的完整流程                               |


---

## 三、需要掌握的内容

1. **Vue Router  basics**
  - 路由配置、`<router-view>`、`<router-link>` 用法
  - 动态路由 `/goods/:id` 的使用
  - 路由守卫 `beforeEach` 做登录判断
2. **Vuex 基础**
  - `state`、`mutations`、`actions` 的职责和用法
  - 用 Vuex 存储 token 和用户信息
  - 组件中通过 `mapState` 或 `computed` 读取用户状态
3. **前后端接口对接**
  - 登录/注册接口的请求格式（URL、请求体）
  - 响应中 token 和用户信息的结构
  - 登录后如何把 token 附加到后续请求的 Header（如 `Authorization`）
4. **表单与基础校验**
  - 用 `v-model` 绑定表单
  - 提交前做必填、格式、密码一致性校验
  - 成功后通过 `router.push()` 跳转
5. **登录态流程**
  - 登录成功 → 存 token → 跳转
  - 刷新页面后从 `localStorage` 恢复登录态
  - 未登录访问需登录页面 → 重定向到登录页

---

## 四、完成标准（目标）

- 能够完成注册
- 能够完成登录
- 前端能看到登录状态（如显示用户名）
- 未登录访问需登录页面时，能自动跳转到登录页

