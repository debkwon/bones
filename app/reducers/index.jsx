import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  user: require('./user').default,
  cart: require('./cart').default
})

export default rootReducer
