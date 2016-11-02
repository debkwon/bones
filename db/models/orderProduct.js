'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  pricePerUnit: {
    type: Sequelize.FLOAT,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = OrderProduct
