// 引入连接实例（从上一级目录的 db.js）
const sequelize = require('../db');

// 引入 Sequelize 里的数据类型，用来定义字段类型
const { DataTypes } = require('sequelize');

// sequelize.define('表名', { 字段定义 }, { 可选配置 })
const User = sequelize.define('User', {
  // id 不写也会自动有，这里显式写出来方便看
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,  // 必填，不能为空
    unique: true      // 用户名唯一，不能重复注册
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false   // 必填，存的是 bcrypt 加密后的字符串
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true    // 可选
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true    // 可选
  }
  // createdAt、updatedAt 不用写，下面 timestamps: true 会自动加
}, {//可选配置
  tableName: 'users',   // 表名，不写的话 Sequelize 默认用复数 Users
  timestamps: true      // 自动维护 createdAt、updatedAt 两个字段
});

module.exports = User;
