const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const Goods = sequelize.define('Goods', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  image:{
    type: DataTypes.STRING(255),//图片路径
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING(50),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'goods',
  timestamps: true
});
module.exports = Goods; // 导出模型