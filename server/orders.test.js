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

   before('sync database & make products', () =>
     db.didSync
       .then(() => Order.truncate({ cascade: true }))
       .then(() => Product.truncate({ cascade: true }))
       .then(() => Promise.props({
          orders: Promise.map(orders, (order) => Order.create(order)),
          products: Promise.map(products, (prod) => Product.create(prod))
        })
       )
       .then(() => console.log('done with associations'))
   )

  it('Get / lists all orders in database', () =>
    request(app)
    .get(`/api/orders`)
    .expect(200)
    .then(res => {
      expect(res.body).to.have.length(orders.length)
    })
  )

  it('Get /:status lists all the order of certain status', () =>
     request(app)
    .get(`/api/orders/shipped`)
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
        product_id: 1,
        quantity: 5,
        price: 34,
      },
      {
        product_id: 2,
        quantity: 10,
        price: 245,
      },
      {
        product_id: 3,
        quantity: 435,
        price: 56
      }
      ]}
    )
    .expect(201)
  )
})

