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


// If we want to include Reviews again:
//<Tab label="Reviews" value="reviews">
  //<AdminReviewsContainer reviews={this.props.reviews}/> 
//</Tab>

export class Admin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: 'orders',
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
          <Tab label="Orders" value="orders">
            <AdminOrdersContainer orders={this.props.orders}/> 
          </Tab>
          <Tab label="Products" value="products">
            <AdminProductsContainer products={this.props.products}/> 
          </Tab>
          <Tab label="Users" value="users">
            <AdminUsersContainer users={this.props.users}/> 
          </Tab>
        </Tabs>
      </div>
  )}
}

export default connect (null) (Admin)