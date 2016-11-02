'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import ProductsContainer from './components/Products'

render (
  <Provider store={store}>
    <ProductsContainer />
  </Provider>,
  document.getElementById('main')
)