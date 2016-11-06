'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import OrdersPanel from './OrdersPanel';

import {Tabs, Tab} from 'material-ui/Tabs';
import { deepPurple500 } from 'material-ui/styles/colors';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 'all orders',
    }
    this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({
      value: value,
    });
  };

  render() {

    // create all orders for rendering
    const {orders} = this.props || [];
    console.log(this.props)

    return (
      <div id="orders-container" style={{margin: 5, padding: 5}}>
        <Tabs
          value={this.state.value}
          onChange={e => this.handleChange(e)}>
          <Tab label="All Orders" value="all orders" >
            <div>
              <h2 style={styles.headline}>All Orders</h2>
            </div>
          </Tab>
          <Tab label="Not Submitted" value="not submitted" >
            <div>
              <h2 style={styles.headline}>Unsubmitted Orders</h2>
            </div>
          </Tab>
          <Tab label="Processing" value="processing">
            <div>
              <h2 style={styles.headline}>Processed Orders</h2>
            </div>
          </Tab>
          <Tab label="Shipped" value="shipped">
            <div>
              <h2 style={styles.headline}>Shipped Orders</h2>
            </div>
          </Tab>
          <Tab label="Delivered" value="delivered">
            <div>
              <h2 style={styles.headline}>Delivered Orders</h2>
            </div>
          </Tab>
          <Tab label="Cancelled" value="cancelled">
            <div>
              <h2 style={styles.headline}>Cancelled Orders</h2>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  status: state.status
})

// const mapDispatchToProps = (dispatch) => ({
//   onOrdersClick: (status) => {
//     dispatch(toggleOrders(status))
//   }
// })

export default connect(mapStateToProps)(Orders);
