'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import store from '../store';
import Paper from 'material-ui/Paper';

export class OrdersPanel extends React.Component {

  componentWillMount () {
      store.subscribe(() => this.setState(store.getState()));
  }

  render () {
    // This never shows that you're logged in -- how do you grab the auth state?
    const {filteredOrders} = this.props;
    let displayOrders;
    

    if (!this.props.auth) {
      return (
        <div>
        { 
          filteredOrders && filteredOrders.map(order => (
            <Paper style={{margin: 20, padding: 5}}key={order.id}>
              <ul>Date Shipped: {order.date}</ul>
              <ul>Total Charge: {order.total}</ul>
            </Paper>
          ))
        }
        </div>
      )
    }
    else {
      return (
        <h3>Please log in to see your order history</h3>
      )
    }
  }
}

export default connect(null)(OrdersPanel);