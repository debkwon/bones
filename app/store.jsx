import { createStore, applyMiddleware } from 'redux'
import rootReducer from './ducks'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './ducks/auth'
import {fetchProducts} from './ducks/products'

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store

// Set the auth info at start
store.dispatch(whoami())
