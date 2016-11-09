import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  user: require('./user').default,
  cart: require('./cart').default,
  currentProduct: require('./product').default,
  orders: require('./orders').default,
  adminOrders: require('./adminOrders').default,
  adminProducts: require('./adminProducts').default,
  adminUsers: require('./adminUsers').default,
  adminReviews: require('./adminReviews').default,
  celebs: require('./celeb').default,
  currentCeleb: require('./celebProducts').default
})

export default rootReducer
