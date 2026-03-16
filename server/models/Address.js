// 收货地址模型
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Address = sequelize.define('Address', {
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
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '收货人姓名'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '手机号'
  },
  province: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '省'
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '市'
  },
  district: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '区/县'
  },
  detail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '详细地址'
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_default',
    comment: '是否默认地址'
  }
}, {
  tableName: 'addresses',
  timestamps: true
});

module.exports = Address;
