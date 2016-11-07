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
import Cart from './components/Cart'
import ProductsContainer from './components/Products'
import ProductContainer from './components/Product'
import OrdersContainer from './components/Orders'
import OrdersPanelContainer from './components/OrdersPanel'
import WhoAmI from './components/WhoAmI'

import { fetchProducts } from './reducers/products'
import { fetchCurrentProduct } from './reducers/product'
import { fetchOrders } from './reducers/orders'
import { updateCartId } from './reducers/cart'
import axios from 'axios'
// for Google's Material UI themes
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300, pink400 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey300,
    primary2Color: pink400,
  },
});


render (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Container} onEnter={onCartEnter}>
          <IndexRedirect to="/products" />
          <Route
            path="/products"
            component={ProductsContainer}
            onEnter={onProductsEnter} />
          <Route
            path="/products/:productId"
            component={ProductContainer}
            onEnter={onCurrentProductEnter}/>
<<<<<<< HEAD
          <Route path="/login" component={Login} />
          <Route path="/logout" component={WhoAmI} />
          <Route path="/user" component={User} />
          <Route path="/reviews" component={Review} />
          <Route path="/cart" component={Cart} />
=======
          <Route
            path="/login"
            component={Login} />
          <Route
            path="/logout"
            component={WhoAmI} />
          <Route
            path="/user"
            component={User} />
          <Route
            path="/reviews"
            component={Review} />
          <Route 
            path="/cart"   
            component={Cart} />
>>>>>>> c2091454d62a71192d4bb79973dc222efc846e11
          <Route
            path="/orders"
            component={OrdersContainer}
            onEnter={onOrdersEnter} />
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
  console.log("this is the nextRouterState: ", nextRouterState)
  const productId = nextRouterState.params.productId;
  const thunk = fetchCurrentProduct(productId);

  store.dispatch(thunk);
  var id = parseInt(window.localStorage.getItem('orderId'));
  if (id){
    axios.get(`/api/orders/ordersproducts/${id}`)
    .then(orders => store.dispatch(updateCartId(orders)))
  }
};

function onOrdersEnter (nextRouterState) {
  const auth = store.getState().auth || {}
  const userId = auth.id || null;
  const thunk = fetchOrders(userId);
  store.dispatch(thunk)
}

function onCartEnter(nextRouterState){
  var id = parseInt(window.localStorage.getItem('orderId'));
  if (id){
    axios.get(`/api/orders/ordersproducts/${id}`)
    .then(orders => store.dispatch(updateCartId(orders)))
  }
}
