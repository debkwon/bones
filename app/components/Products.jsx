'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';


export class Products extends React.Component {
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
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products })

export default connect(mapStateToProps)(Products);


