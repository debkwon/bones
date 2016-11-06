// COMPONENT

'use strict'

import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Review from './Review';

import Chip from 'material-ui/Chip';
import {Tabs, Tab} from 'material-ui/Tabs';

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
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  render() {
    console.log("this.props?", this.props)
    const { currentProduct } = this.props || {}
    return (
      <div className="container mdl-grid" id="product">
        <div className="mdl-cell mdl-cell--5-col">
          <img src={currentProduct.photoURL} />
        </div>
        <div className="mdl-cell mdl-cell--7-col">
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
            <Tab label="Reviews" value="reviews">
              <div>
                <h2>Who Loves It</h2>
                  {this.props.reviews ? this.props.reviews.map(review =>(
                    <div className="review">
                      <span>{review.stars}</span>
                      <p>{review.text}</p>
                      <span>{review.user}</span>
                    </div>
                  ))
                  :
                  <h3>
                  There are no reviews for this product yet
                  </h3>
                  }
                  <Review />
              </div>
            </Tab>
          </Tabs>
          <div id='product-tabs' className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            <div className="mdl-tabs__tab-bar">
                <a href="#description-panel" className="mdl-tabs__tab is-active">Description</a>
                <a href="#reviews-panel" className="mdl-tabs__tab">Reviews</a>
            </div>

            <div className="mdl-tabs__panel is-active" id="description-panel">
              <div>
                <h2>Why It's Fabulous</h2>
                <p>{currentProduct.description}
                </p>
              </div>
            </div>
            <div className="mdl-tabs__panel" id="reviews-panel">
              <div>
                <h2>Who Loves It</h2>
                  {this.props.reviews ? this.props.reviews.map(review =>(
                    <div className="review">
                      <span>{review.stars}</span>
                      <p>{review.text}</p>
                      <span>{review.user}</span>
                    </div>
                  ))
                  :
                  <h3>
                  There are no reviews for this product yet
                  </h3>
                  }
                  <Review />
              </div>
            </div>
          </div>
          <div className="below-tabs">
          <span>Price: ${currentProduct.price}</span>
          <div>
          <label>Quantity</label>
          <select>
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
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
         BUY
         </button>
         </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProduct: state.currentProduct })

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onLoadCurrentProduct: function () {
      const currentProductId = ownProps.params.productId;
      const thunk = loadCurrentProduct(currentProductId);
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
