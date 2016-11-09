'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import store from '../store';
import axios from 'axios';
import {updateCartId , updateProductQuantityInDb} from '../reducers/cart'



export class Products extends React.Component {
  constructor() {
    super()
    this.add = this.add.bind(this);
  }

  add(product_obj){
    let total;
    let productIsInCart = false;
    let cartIndex;
    let quantity = 1;
      this.props.cart.products.forEach((prod, idx) => {
        if (prod.id === product_obj.product.id) {
          productIsInCart = true;
          cartIndex = idx;
        }
      })
    // console.log(this.props, "this.props in add product")
    if (!this.props.auth && !window.localStorage.getItem('orderId')){ //if user is not logged and the order id is null
      total = product_obj.product.price
      console.log(total, "this is the total")
      // console.log(typeof product.price, typeof product.quantity)
      // console.log(product.product, "this is product")

      axios.post('/api/orders', {total: total, user: null, products:[product_obj.product]})
      .then((res) =>{
        window.localStorage.setItem('orderId', (res.data.id).toString());

        store.dispatch(updateCartId({order_id: res.data.id, user_id: null, products: [product_obj.product], total:total}))
      }
      )
      .catch(err=> console.log(err.stack))
    }
    else if (!this.props.auth && window.localStorage.getItem('orderId')){ //if user is not logged in, but there's an existing created order
      let id = parseInt(window.localStorage.getItem('orderId'));
      total = this.props.cart.total + product_obj.product.price
      if (productIsInCart){
          let tempCart = this.props.cart.products;
          tempCart[cartIndex]['order_product']['quantity'] = (tempCart[cartIndex]['order_product']['quantity'] + quantity);
          store.dispatch(updateProductQuantityInDb(tempCart,total))
          axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: null, status: this.props.cart.status, products: tempCart})

      }else{
          axios.put(`/api/orders/${id}`, {total: total, user_id: null, status: this.props.cart.status, products:this.props.cart.products.concat(product_obj.product)})
          .then(res=>{
            console.log("what", res);
            store.dispatch(updateCartId({order_id: id, user_id: null, products: this.props.cart.products.concat(product_obj.product), total:total}))
          }
          )
      }
    }else if(this.props.cart.order_id){
      total = this.props.cart.total + product_obj.product.price
      if (productIsInCart){
          let tempCart = this.props.cart.products;
          tempCart[cartIndex][quantity] = quantity;
          store.dispatch(updateProductQuantityInDb(tempCart,total))
          .then(() =>
            axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: this.props.auth.id, status: this.props.cart.status, products: this.props.cart.products})
          )
          .catch(err=> console.log(err.stack))
      }
      else{
            axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: this.props.auth.id, status: this.props.cart.status, products:this.props.cart.products.concat(product_obj.product)})
            .then(res=>
              store.dispatch(updateCartId({order_id: this.props.cart.order_id, user_id: this.props.auth.id, products: this.props.cart.products.concat(product_obj.product), total:total}))
            )
      }
    }else{
      total = product_obj.product.price;
      axios.post('/api/orders', {total: total, user: this.props.auth.id, products:[product_obj.product]})
      .then((res) =>
        store.dispatch(updateCartId({order_id: res.data.id, user_id: this.props.auth.id, products: [product_obj.product], total:total}))
      )
      .catch(err=> console.log(err.stack))
    }
  }

  render() {
    const { products } = this.props || []
    let idx = 0;
    return (
      <div id="productsTable">
        <div className='mdl-grid'>
          <h2 className='mdl-cell mdl-cell--12-col'>All Products</h2>
          {products && products.map(product => (
              <div key={product.id} className="mdl-card mdl-cell mdl-cell--4-col mdl-shadow--2dp">
                <Link to={`/products/${product.id}`}>
                  <div className="mdl-card__media">
                    <img src={product.photoURL}/>
                  </div>
                  <div className="mdl-card__title">
                    <span>{product.name}</span>
                  </div>
                  <div className="mdl-card__supporting-text">
                  {product.categories && product.categories.map(category => (
                      <div className='mdl-chip' key={idx++}>
                        <span className="mdl-chip__text">{category}</span>
                      </div>
                    ))
                  }
                  </div>
                </Link>
                  <RaisedButton type="submit" label="ADD" primary={true} onClick={evt=>{ evt.preventDefault(); this.add({product});}}/>
              </div>
            ))
          }
        </div>
     </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
  auth: state.auth
 })


export default connect(mapStateToProps)(Products);


