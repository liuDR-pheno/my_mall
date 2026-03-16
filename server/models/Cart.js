// 购物车模型：用户 + 商品 + 数量
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: { model: 'users', key: 'id' }
  },
  goodsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'goods_id',
    references: { model: 'goods', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'carts',
  timestamps: true
});

module.exports = Cart;
