import { combineReducers } from 'redux'
import products from './products'

export default rootReducer
  auth: require('./auth').default,
  products: require('./products').default  
})
