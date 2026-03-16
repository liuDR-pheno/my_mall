const sequelize = require('../db');
const User = require('./User');
const Goods = require('./Goods');
const Cart = require('./Cart');
const Address = require('./Address');
const Order = require('./Order');

module.exports = {
  sequelize,
  User,
  Goods,
  Cart,
  Address,
  Order
};