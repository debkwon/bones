'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('orders', {
    shippingDate: Sequelize.DATE,
    status: {
      type: Sequelize.ENUM,
      values: ['processing', 'shipped', 'delivered'],
      defaultValue: 'processing'
    }
  }
);

module.exports = Order;
