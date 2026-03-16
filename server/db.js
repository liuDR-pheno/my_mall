const { Sequelize } = require('sequelize');

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('my_mall', 'root', '59707Ljj', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
module.exports = sequelize;