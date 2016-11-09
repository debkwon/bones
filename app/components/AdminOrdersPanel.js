'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import store from '../store';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { grey200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';


export class OrdersPanel extends React.Component {

  // convertToMoney (num) {
  //   let numWithDecs
  //   if (num === num.toFixed(0)) numWithDecs = Number(num + '.00')
  //   else if (num === num.toFixed(1)) numWithDecs = Number(num + '0')
  //   else numWithDecs = num;
  //   return ('$' + Number(numWithDecs))
  // }

  constructor () {
    super()
    // this.convertToMoney.bind(this)
    this.handleChange.bind(this)
  }

  handleChange (event, index, value) {
    this.setState({value}); 
  }

  render () {
    
    const { filteredOrders } = this.props || [];
    let displayOrders;
    
    return (
      <div>
        { 
          filteredOrders && filteredOrders.map(order => (
            <Paper style={{margin: 20, padding: 5, backgroundColor: grey200}}key={order.id}>
              <Subheader style={{margin: 20}}>Order #{order.id}</Subheader>
              <Table selectable={false} >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Product</TableHeaderColumn>
                    <TableHeaderColumn>Purchase Price</TableHeaderColumn>
                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                    <TableHeaderColumn>Item Total</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {
                    order.products && order.products.map(unit => (
                      <TableRow style={{fontSize: 16}} key={unit.id}>
                        <TableRowColumn>{unit.name}</TableRowColumn> 
                        <TableRowColumn>{unit.order_product.pricePerUnit}</TableRowColumn>
                        <TableRowColumn>{unit.order_product.quantity}</TableRowColumn>
                        <TableRowColumn>{unit.order_product.pricePerUnit * unit.order_product.quantity}</TableRowColumn>
                        <TableRowColumn>
                          <RaisedButton
                            label="Remove item from order"
                            secondary={true}>
                          </RaisedButton>
                        </TableRowColumn>
                      </TableRow>
                    ))
                  }
                </TableBody>
                <TableFooter>
                  <TableHeaderColumn>Order Created On{order.created_at}</TableHeaderColumn>
                  <TableHeaderColumn>Order Shipped On{order.shippingDate}</TableHeaderColumn>
                  <TableHeaderColumn><DatePicker hintText="Select Shipping Date"/></TableHeaderColumn>
                  <TableRowColumn>
                    <SelectField
                      value={order.status}
                      onChange={this.handleChange}>
                      <MenuItem value={'processing'} primaryText="Processing" />
                      <MenuItem value={'shipped'} primaryText="Shipped" />
                      <MenuItem value={'delivered'} primaryText="Delivered" />
                      <MenuItem value={'cancelled'} primaryText="Cancelled" />
                    </SelectField>
                  </TableRowColumn>
                  <TableHeaderColumn>Total Cost: {order.total}</TableHeaderColumn>
                </TableFooter>
              </Table>
            </Paper>
          ))
        }
      </div>
    )
  }
}


export default connect(null)(OrdersPanel);