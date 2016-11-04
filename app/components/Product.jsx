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
    // console.log(this.props)
    const { currentProduct } = this.props || {}
    return (
      <div className="container">
        <img 
          src={currentProduct.photoURL} />
        <h2>{currentProduct.name}</h2>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Description" value="description" >
            <div>
              <h2 style={styles.headline}>Why It's Fabulous</h2>
              <p>{currentProduct.description}
              </p>
            </div>
          </Tab>
          <Tab label="Reviews" value="reviews">
            <div>
              <h2 style={styles.headline}>Who Loves It</h2>
                <Review />
            </div>
          </Tab>
        </Tabs>
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
