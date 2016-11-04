const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Order = require('APP/db/models/order');
const Product = require('APP/db/models/product');
const OrderProduct = require('APP/db/models/orderProduct')
const router = require('express').Router();
const app = require('./start')
const Promise = require('bluebird');

describe('/api/orders', () => {
  const products = [
   {
      name: "Mary Jane outfit",
      price: 10.00,
      categories: ["Comics", "Clothing" ]
    },
    {
      name: "Giant Diamond Ring",
      price: 30000.00,
      categories: ["Jewelry"]
    },
    {
      name: "Leather vest",
      price: 300.00,
      categories: ["Clothing"]
    }
   ]

   const orders = [
    {
      user_id: 2,
      total: 357,
      status: 'delivered'
    },
    {
      user_id: 1,
      total: 385
    },
    {
      user_id: 2,
      total: 1947,
      status: 'shipped'
    }
   ]

   let usableProductIds = []
   let orderIds = []

   before('sync database & make products', () =>
     db.didSync
       .then(() => Order.truncate({ cascade: true }))
       .then(() => Product.truncate({ cascade: true }))
       .then(() => Promise.props({
          orders: Promise.map(orders, (order) => Order.create(order)),
          products: Promise.map(products, (prod) => Product.create(prod))
        })
       )
       .then(({orders, products}) => {
         products.map((product) => usableProductIds.push(product.id))
         orders.map((order) => orderIds.push(order.id))
       }
       )
   )

  it('Get / lists all orders in database', () =>
    request(app)
    .get(`/api/orders`)
    .expect(200)
    .then(res => {
      expect(res.body).to.have.length(orders.length)
    })
  )

  it('Get /:orderId gets order with corresponding id', () =>
     request(app)
     .get(`/api/orders/${orderIds[0]}`)
     .expect(200)
     .then(res => {
      expect(res.body).to.be.an('object')
     })
  )

  it('Get /status/:status lists all the order of certain status', () =>
     request(app)
    .get(`/api/orders/status/shipped`)
    .expect(200)
    .then(res => {
      expect(res.body).to.have.length(1)
      expect(res.body[0].total).to.eql(1947)
    })
  )

  it('Get /users/:user_id lists all orders for a specific user', () =>
    request(app)
    .get(`/api/orders/users/2`)
    .expect(200)
    .then(res => {
      expect(res.body).to.have.length(2)
      expect(res.body[0].total + res.body[1].total).to.eql(2304)
    })
  )

  it('Get /users/:user_id/:status lists all orders of ceratin status for specific user', () =>
    request(app)
    .get(`/api/orders/users/2/delivered`)
    .expect(200)
    .then(res => {
      expect(res.body).to.have.length(1)
      expect(res.body[0].total).to.eql(357)
    })
  )

  it('Post / creates a new order WITH corresponding rows in OrderProduct table', () =>
    request(app)
    .post('/api/orders')
    .send({
      total: 4358,
      user: 2,
      products: [
      {
        product_id: usableProductIds[0],
        quantity: 5,
        price: 34,
      },
      {
        product_id: usableProductIds[1],
        quantity: 10,
        price: 245,
      },
      {
        product_id: usableProductIds[2],
        quantity: 345,
        price: 6754,
      }
      ]}
    )
    .expect(201)
  )
})

