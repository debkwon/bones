'use strict'

import React from 'react'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import { products } from 'APP/app/reducers/products';

export class Products extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Selleb</h1>
        <h3>Your source for celeb memoribilia</h3>
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Description</th>
              <th>Categories</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={product.id}>
                  <td img={product.photoURL}></td>
                  <td>
                    <a onClick={() => {
                      
                    }}>{product.name}</a>
                  </td>
                  <td>{product.description}</td>
                  <td>{product.categories}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (products) => ({ products })

export default connect(mapStateToProps, null)(Products);




