import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import AdminOrdersPanel from './AdminOrdersPanel';


export class AdminOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'all orders',
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  render() {
    console.log("These are your props: ", this.props)
    const { allOrders } = this.props || [];
    console.log("These are all the orders: ", allOrders)

    return (
      <div id="orders-container" style={{margin: 5, padding: 5}}>
        <Tabs
          value={this.state.value}
          onChange={e => this.handleChange(e)}>
          <Tab label="All Orders" value="all orders" >
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
          <Tab label="Not Submitted" value="not submitted" >
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
          <Tab label="Processing" value="processing">
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
          <Tab label="Shipped" value="shipped">
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
          <Tab label="Delivered" value="delivered">
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
          <Tab label="Cancelled" value="cancelled">
            <div>
              <AdminOrdersPanel />
            </div>
          </Tab>
        </Tabs>
      </div>
  )}
}

const mapStateToProps = (state) => ({
  allOrders: state.allOrders
})

export default connect (
  mapStateToProps,
  null
) (AdminOrders)