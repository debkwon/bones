'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



export class AdminProducts extends React.Component {

  render() {
    const { allProducts } = this.props || [];
    console.log("These are all your products: ", allProducts)

    return (
      <div>
        { 
          allProducts && allProducts.map(product => (
            <Paper style={{margin: 20, padding: 5, backgroundColor: grey200}}key={product.id}>
              <Subheader style={{margin: 20}}>Product Added on {product.created_at.slice(0, 10)}</Subheader>
              <Table selectable={false} >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Product</TableHeaderColumn>
                    <TableHeaderColumn>Purchase Price</TableHeaderColumn>
                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {
                    order.products && order.products.map(unit => (
                        <TableRow key={unit.id}>
                          <TableRowColumn>{unit.name}</TableRowColumn>
                          <TableRowColumn>{unit.order_product.pricePerUnit}</TableRowColumn>
                          <TableRowColumn>{unit.order_product.quantity}</TableRowColumn>
                          <TableRowColumn>
                            <RaisedButton
                              label="Reorder Item"
                              href="products/:productId"
                              secondary={true}
                            >
                              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            </RaisedButton>
                          </TableRowColumn>
                        </TableRow>
                      ))
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableRowColumn style={{fontWeight: 'bold'}}>Total: ${order.total}</TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          ))
        }
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.allProducts,
 })


export default connect(mapStateToProps)(AdminProducts);


