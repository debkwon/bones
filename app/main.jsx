'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Root from './components/Root'
import ProductsContainer from './components/Products'
import Login from './components/Login'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ProductsContainer} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('main')
)