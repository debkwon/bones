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
import {updateCartId} from '../reducers/cart'


export class Products extends React.Component {
  constructor() {
    super()
    this.add = this.add.bind(this);
    this.del = this.del.bind(this);

  }
  add(product_obj){
    let total;
    // console.log(this.props, "this.props in add product")
    if (!this.props.auth && !this.props.cart.order_id){ //if user is not logged and the order id is null
      total = product_obj.product.price * product_obj.product.quantity
      console.log(total, "this is the total")
      // console.log(typeof product.price, typeof product.quantity)
      // console.log(product.product, "this is product")
      axios.post('/api/orders', {total: total, user: null, products:[product_obj.product]})
      .then((res) =>
        store.dispatch(updateCartId({order_id: res.data.id, user_id: null, products: [product_obj.product]}))
      )
      .catch(err=> console.log(err.stack))
    }
    else if (!this.props.auth && this.props.cart.order_id){ //if user is not logged in, but there's an existing created order
      total = this.props.cart.total + (product_obj.product.price * product_obj.product.quantity)
      axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: null, status: this.props.cart.status, })
    }
    }

  del(product){
    console.log("DEL",product);
  }

  render() {
    const { products } = this.props || []
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
                      <div className='mdl-chip'>
                        <span className="mdl-chip__text">{category}</span>
                      </div>
                    ))
                  }
                  </div>
                </Link>
                  <RaisedButton type="submit" label="ADD" primary={true} onClick={evt=>{ evt.preventDefault(); this.add({product});}}/>
                  <RaisedButton type="submit" label="DELETE" primary={true}  onClick={evt=>{ evt.preventDefault(); this.del({product});}}/>
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


