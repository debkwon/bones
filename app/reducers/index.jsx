import { combineReducers } from 'redux'
import products from './products'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  products
})

export default rootReducer