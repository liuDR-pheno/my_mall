// 订单模型
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Order', {
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
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'address_id',
    references: { model: 'addresses', key: 'id' }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_amount',
    comment: '订单总金额'
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pending',
    comment: '状态: pending-待支付, paid-已支付, shipped-已发货, completed-已完成, cancelled-已取消'
  },
  orderNo: {
    type: DataTypes.STRING(32),
    allowNull: true,
    field: 'order_no',
    comment: '订单号'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
