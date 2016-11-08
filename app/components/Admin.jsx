import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import ProductsContainer from './Products'
import OrdersContainer from './Orders'
import Review from './Review'
import UsersContainer from './User'
import AdminProductsContainer from './AdminProducts'
import AdminOrdersContainer from './AdminOrders'
import AdminUsersContainer from './AdminUsers'
import AdminReviewsContainer from './AdminReviews'
import {Tabs, Tab} from 'material-ui/Tabs';


export class Admin extends Component {
  
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
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={e => this.handleChange(e)}>
          <Tab label="Products" value="products">
            <AdminProductsContainer /> 
          </Tab>
          <Tab label="Orders" value="orders">
            <AdminOrdersContainer /> 
          </Tab>
          <Tab label="Users" value="users">
            <AdminUsersContainer /> 
          </Tab>
          <Tab label="Reviews" value="reviews">
            <AdminReviewsContainer /> 
          </Tab>
        </Tabs>
      </div>
  )}
}



const mapStateToProps = (state) => ({
  allOrders: state.allOrders, 
  allProducts: state.allProducs, 
  allReviews: state.allReviews, 
  allUsers: state.allUsers
})

export default connect (
  mapStateToProps,
  null
) (Admin)