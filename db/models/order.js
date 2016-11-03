'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');
const OrderProduct = require('./orderProduct');

const Order = db.define('orders', {
    shippingDate: Sequelize.DATE,
    status: {
      type: Sequelize.ENUM,
      values: ['processing', 'shipped', 'delivered', 'cancelled'],
      defaultValue: 'processing'
    }
  },
  {
    instanceMethods: {
      getTotal: function () {
        console.log('running total')
        console.log("this", this)
        let total = 0;
        OrderProduct.findAll({
          where: {order_id: this.id}
        })
        .then(products => {
          products.forEach(row => {
            total += row.pricePerUnit * row.quantity
          })
        }).then(() => {
          console.log('is it summing?', total)
          return total
        }
        )
      }
    }
  }
);

module.exports = Order;
