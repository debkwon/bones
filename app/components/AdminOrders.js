import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AdminOrdersPanel from './AdminOrdersPanel';
import { fetchOrdersAdmin } from '../reducers/adminOrders'

export class AdminOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'all',
    }
    this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({
      value: value,
    });
  };

  render() {

    const { adminOrders } = this.props || [];

    return (
      <div id="orders-container" style={{margin: 5, padding: 5}}>
        <Tabs
          value={this.state.value}
          onChange={e => this.handleChange(e)}>
          <Tab label="All Orders" value="all">
            <div>
              <AdminOrdersPanel filteredOrders={adminOrders}/>
            </div>
          </Tab>
          <Tab label="Not Submitted" value="not submitted" >
            <div>
              <AdminOrdersPanel filteredOrders={
                adminOrders.filter(order => order.status === 'not submitted')}/>
            </div>
          </Tab>
          <Tab label="Processing" value="processing">
            <div>
              <AdminOrdersPanel filteredOrders={
                adminOrders.filter(order => order.status === 'processing')}/>
            </div>
          </Tab>
          <Tab label="Shipped" value="shipped">
            <div>
              <AdminOrdersPanel filteredOrders={
                adminOrders.filter(order => order.status === 'shipped')}/>
            </div>
          </Tab>
          <Tab label="Delivered" value="delivered">
            <div>
              <AdminOrdersPanel filteredOrders={
                adminOrders.filter(order => order.status === 'delivered')}/>
            </div>
          </Tab>
          <Tab label="Cancelled" value="cancelled">
            <div>
              <AdminOrdersPanel filteredOrders={
                adminOrders.filter(order => order.status === 'cancelled')}/>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  adminOrders: state.adminOrders
})

export default connect(mapStateToProps)(AdminOrders);