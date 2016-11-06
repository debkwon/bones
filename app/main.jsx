// MAIN

'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import styles from './style/main.css'
import store from './store'

import Container from './components/Container'
import Login from './components/Login'
import User from './components/User'
import Review from './components/Review'
import ProductsContainer from './components/Products'
import ProductContainer from './components/Product'
<<<<<<< HEAD
import OrdersContainer from './components/Orders'

import { fetchProducts } from './ducks/products'
import { fetchCurrentProduct } from './ducks/product'
import { fetchOrders } from './ducks/orders'
=======

import { fetchProducts } from './reducers/products'
import { fetchCurrentProduct } from './reducers/product'
>>>>>>> parent of 81e56d5... Merge branch 'master' of https://github.com/debkwon/selleb


// for Google's Material UI themes
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300, pink400 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pink400,
    primary2Color: grey300,
  },
});


render (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Container}>
          <IndexRedirect to="/products" />
          <Route 
            path="/products" 
            component={ProductsContainer} 
            onEnter={onProductsEnter()} />
          <Route 
            path="/products/:productId"
            component={ProductContainer}
            onEnter={onCurrentProductEnter}/>
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/reviews" component={Review} />
          <Route 
            path="/orders" 
            component={OrdersContainer}
            onEnter={onOrdersEnter()} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)

function onProductsEnter () {
  const thunk = fetchProducts();
  store.dispatch(thunk)
}

function onCurrentProductEnter (nextRouterState) {
  console.log("this is the nextRouterState: ",nextRouterState)
  const productId = nextRouterState.params.productId;
  const thunk = fetchCurrentProduct(productId);
  store.dispatch(thunk);
<<<<<<< HEAD
};

function onOrdersEnter () {
  const thunk = fetchOrders();
  store.dispatch(thunk)
}
=======
};
>>>>>>> parent of 81e56d5... Merge branch 'master' of https://github.com/debkwon/selleb
