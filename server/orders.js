const Order = require('APP/db/models/order');
const Product = require('APP/db/models/product');
const OrderProduct = require('APP/db/models/orderProduct')
const router = require('express').Router();

router.get('/', (req, res, next) =>
  Order.findAll()
  .then(orders => res.send(orders))
  .catch(next)
)

router.get('/:status', (req, res, next) =>
  Order.findAll({where: {status: req.params.status}})
  .then(orders => res.send(orders))
  .catch(next)
)

router.get('/users/:userid', (req, res, next) =>
  Order.findAll({where: {user_id: req.params.userid}})
  .then(orders => res.send(orders))
  .catch(next)
)

router.get('/users/:userid/:status', (req, res, next) =>
  Order.findAll({where: {user_id: req.params.userid, status: req.params.status}})
  .then(orders => res.send(orders))
  .catch(next)
)

router.post('/', (req, res, next) =>{
  let orderInfo = {
    total: req.body.total,
    user_id: req.body.user
  }

  let orderProducts = req.body.products

  Order.create(orderInfo)
  .then(order =>
    orderProducts.map((product) =>
      OrderProduct.create({
        order_id: order.id,
        product_id: item.product_id,
        pricePerUnit: item.price,
        quantity: item.quantity
      }))
    )
  .then(rows =>
    res.status(201).send(order)
  )
  .catch(next)
})



module.exports = router;
