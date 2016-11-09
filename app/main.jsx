// MAIN

'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
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
import AdminContainer from './components/Admin'
import Checkout from './components/Checkout'
import Celeb from './components/Celeb'
import CelebProducts from './components/CelebProducts'

import { fetchProducts } from './reducers/products'
import { fetchCurrentProduct } from './reducers/product'
import { fetchCelebs } from './reducers/celeb'
import { fetchOrders } from './reducers/orders'

import { fetchOrdersAdmin } from './reducers/adminOrders'
import { fetchProductsAdmin } from './reducers/adminProducts'
import { fetchReviewsAdmin } from './reducers/adminReviews'
import { fetchUsersAdmin } from './reducers/adminUsers'

import { updateCartId } from './reducers/cart'
import { fetchCurrentCeleb } from './reducers/celebProducts'


// for Google's Material UI themes
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey400, pink400 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey400,
    primary2Color: pink400,
  },
});
//import styles from './style/main.css'


render (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Container} onEnter={onCartEnter} >
          <IndexRedirect to="/products" />
          <Route
            path="/products"
            component={ProductsContainer}
            onEnter={onProductsEnter} />
          <Route
            path="/products/:productId"
            component={ProductContainer}
            onEnter={onCurrentProductEnter}/>

          <Route path="/login" component={Login} />
          <Route path="/logout" component={WhoAmI} />
          <Route path="/user" component={User} />
          <Route path="/reviews" component={Review} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path='/celebs' component={Celeb} onEnter={onCelebsEnter}/>
          <Route path='/celebs/:celebId' component={CelebProducts} onEnter={onCelebProductEnter}/>
          <Route
            path="/orders"
            component={OrdersContainer}
            onEnter={onOrdersEnter} />
          <Route
            path="/admin"
            component={AdminContainer}
            onEnter={onAdminEnter} />
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

function onCelebsEnter () {
  const thunk = fetchCelebs();
  store.dispatch(thunk)
}

function onCurrentProductEnter (nextRouterState) {
  const productId = nextRouterState.params.productId;
  const thunk = fetchCurrentProduct(productId);
  store.dispatch(thunk);
  // var id = parseInt(window.localStorage.getItem('orderId'));
  //   console.load("here",id);
  // if (id){
  //   console.load("here",id);
  //   axios.get(`/api/orders/ordersproducts/${id}`)
  //   .then(orders =>{console.log("load", orders); store.dispatch(updateCartId(orders))})
  //   //{user_id:res.data[0].user_id, order_id:res.data[0].id, products:res.data[0].products}
  // }
};

function onCelebProductEnter (nextRouterState) {
  const celebId = nextRouterState.params.celebId;
  const thunk = fetchCurrentCeleb(celebId);
  store.dispatch(thunk);
}

function onOrdersEnter (nextRouterState) {
  const auth = store.getState().auth || {}
  const userId = auth.id || null;
  const thunk = fetchOrders(userId);
  store.dispatch(thunk)
}

function onAdminEnter () {
  const thunk = fetchProductsAdmin()
  store.dispatch(thunk)
}

function onCartEnter(nextRouterState){
  var id = parseInt(window.localStorage.getItem('orderId'));
  if (id){
    axios.get(`/api/orders/ordersproducts/${id}`)
    .then(orders => {console.log("here",orders);//store.dispatch(updateCartId(orders))
                    if(orders.data.length>0) store.dispatch(updateCartId({user_id:null, order_id:id, products:orders.data[0].products, total:orders.data[0].total}))

  })
  }
  else{
      store.dispatch(updateCartId({user_id:null, order_id:id, products:[], total:0}));

  }
}
