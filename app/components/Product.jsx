// COMPONENT

'use strict'

import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Review from './Review';
import { updateCartId} from '../reducers/cart';
import Chip from 'material-ui/Chip';
import {Tabs, Tab} from 'material-ui/Tabs';
import store from '../store';
import axios from 'axios';
import { updateProductQuantityInDb } from '../reducers/cart';
const styles = {
  chip: {
    margin: 4,
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

// const currentProduct = {
//   name: 'Hillary\'s Pantsuit', description: 'Classic red pantsuit', quantity: 3, categories: 'Clothing', photoURL: 'http://s1.r29static.com//bin/entry/567/x,80/1660164/image.jpg'
// }

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'description',
      quantity: 0
    }
    this.addProduct = this.addProduct.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

   handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  updateQuantity = (num) => {
    this.setState({
      quantity: num
    })
  }

  addProduct = (currentProduct, quantity) => {
      console.log(typeof currentProduct.price, "====first line of addProduct, this is currentProduct")
      console.log(typeof this.state.quantity, "===is this quantity a string?")
      console.log(typeof this.props.cart.total, "===is this total a string?")
      let total;
      // console.log(this.props, "this.props in add product")
      let productIsInCart = false;
      let cartIndex;
      this.props.cart.products.forEach((prod, idx) => {
        if (prod.id === currentProduct.id) {
          productIsInCart = true;
          cartIndex = idx;
        }
      })

      if (!this.props.auth && !window.localStorage.getItem('orderId')){ //if user is not logged and the order id is null
        total = currentProduct.price * quantity
        axios.post('/api/orders', {total: total, user: null, products:[currentProduct]})
        .then((res) =>{
          window.localStorage.setItem('orderId', (res.data.id).toString());
          store.dispatch(updateCartId({order_id: res.data.id, user_id: null, products: [currentProduct], total:total}))
        }
        )
        .catch(err=> console.log(err.stack))
      }

      else if (!this.props.auth && window.localStorage.getItem('orderId')){ //if user is not logged in, but there's an existing created order
        let id = parseInt(window.localStorage.getItem('orderId'));
        total = parseInt(this.props.cart.total) + (currentProduct.price * quantity)

        if (productIsInCart){
          let tempCart = this.props.cart.products;
          tempCart[cartIndex]['quantity'] = (tempCart[cartIndex]['quantity'] + quantity);
          store.dispatch(updateProductQuantityInDb(tempCart,total))
          axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: null, status: this.props.cart.status, products: tempCart})

        }
        else {
          axios.put(`/api/orders/${id}`, {total: total, user_id: null, status: this.props.cart.status, products:this.props.cart.products.concat(currentProduct)})
          .then(res=>{
            console.log(res, "res inside put request for open order")
            store.dispatch(updateCartId({order_id: id, user_id: null, products: this.props.cart.products.concat(currentProduct), total:total}))
          }
        )
          .catch(err=> console.log(err.stack))
        }
      }
      else if(this.props.cart.order_id){
        total = this.props.cart.total + (currentProduct.price * quantity)

        if (productIsInCart){
          let tempCart = this.props.cart.products;
          tempCart[cartIndex][quantity] = quantity;
          store.dispatch(updateProductQuantityInDb(tempCart,total))
          .then(() =>
            axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: this.props.auth.id, status: this.props.cart.status, products: this.props.cart.products})
          )
          .catch(err=> console.log(err.stack))
        }
        else {
        axios.put(`/api/orders/${this.props.cart.order_id}`, {total: total, user_id: this.props.auth.id, status: this.props.cart.status, products:this.props.cart.products.concat(currentProduct)})
        .then(res=>
          store.dispatch(updateCartId({order_id: this.props.cart.order_id, user_id: this.props.auth.id, products: this.props.cart.products.concat(currentProduct), total:total}))
        )}
      }
      else {
        total = currentProduct.price;
        axios.post('/api/orders', {total: total, user: this.props.auth.id, products:[currentProduct]})
        .then((res) =>
          store.dispatch(updateCartId({order_id: res.data.id, user_id: this.props.auth.id, products: [currentProduct], total:total}))
        )
        .catch(err=> console.log(err.stack))
      }
    }

  render() {
    const { currentProduct } = this.props || {}
    return (
      <div className="mdl-grid" id="product">
        <div className="mdl-cell mdl-cell--5-col">
          <img src={currentProduct.photoURL} />
        </div>
        <div className="mdl-cell mdl-cell--7-col group" id="product-right">
          <h1>{currentProduct.name}</h1>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Description" value="description" >
              <div>
                <h2>Why It's Fabulous</h2>
                <p>{currentProduct.description}
                </p>
              </div>
            </Tab>
            <Tab label="Reviews" value="reviews" className="reviews">
              <div>
                <h2>Who Loves It</h2>
                  {this.props.currentProduct.reviews ? this.props.currentProduct.reviews.map(review =>{
                    var stars = ''
                    for (let i = 0; i < review.stars; i++) {
                      stars += '⭐ '
                    }
                    return (
                    <div className="review-card mdl-card mdl-card mdl-shadow--2dp">
                      <div className='mdl-card__title'>
                        <div>{review.user.firstName} {review.user.lastName.substr(0, 1)}.</div>
                        <div>{stars}/ 5 stars</div>
                      </div>
                      <div className='mdl-card__supporting-text'>{review.text}</div>
                      <div className='mdl-card__actions'>{review.created_at.substr(0, 10)}</div>
                    </div>)}
                  )
                  :
                  <h3>
                  There are no reviews for this product yet
                  </h3>
                  }
                  <Review />
              </div>
            </Tab>
          </Tabs>
          <div className="below-tabs">
          <span>Price: ${currentProduct.price}</span>
          <div>
          <label>Quantity</label>
          <select onChange={(e) => this.updateQuantity(+(e.target.value))}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          </div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          onClick={evt => {
            evt.preventDefault()
            console.log('in onClick')
            this.addProduct(this.props.currentProduct, this.state.quantity)
          } }>
         BUY
         </button>
         </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({currentProduct, auth, cart}) => ({
  currentProduct,
  auth,
  cart
   });

export default connect(mapStateToProps, null)(Product);
