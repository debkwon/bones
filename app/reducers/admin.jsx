import axios from 'axios'

export default function reducer (state = [], action) {
  switch(action.type) {

    case RECEIVE_ORDERS_ADMIN:
      return action.allOrders;

    case RECEIVE_PRODUCTS_ADMIN:
      return action.allProducts;
      
    case RECEIVE_REVIEWS_ADMIN:
      return action.allReviews;

    case RECEIVE_USERS_ADMIN:
      return action.allUsers;

    default:
      return state;
  }
}

const RECEIVE_ORDERS_ADMIN = 'RECEIVE_ORDERS_ADMIN';
const RECEIVE_PRODUCTS_ADMIN = 'RECEIVE_PRODUCTS_ADMIN';
const RECEIVE_REVIEWS_ADMIN = 'RECEIVE_REVIEWS_ADMIN';
const RECEIVE_USERS_ADMIN = 'RECEIVE_USERS_ADMIN';

export const receiveOrdersAdmin = (allOrders) => ({
  type: RECEIVE_ORDERS_ADMIN, allOrders
})

export const receiveProductsAdmin = (allProducts) => ({
  type: RECEIVE_PRODUCTS_ADMIN, allProducts
})

export const receiveReviewsAdmin = (allReviews) => ({
  type: RECEIVE_REVIEWS_ADMIN, allReviews
})

export const receiveUsersAdmin = (allUsers) => ({
  type: RECEIVE_USERS_ADMIN, allUsers
})

export const fetchOrdersAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/orders/`)
    .then(function (response) {
      const action = receiveOrdersAdmin(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};

export const fetchProductsAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/products/`)
    .then(function (response) {
      const action = receiveProductsAdmin(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};

export const fetchReviewsAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/reviews/`)
    .then(function (response) {
      const action = receiveReviewsAdmin(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};

export const fetchUsersAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/users/`)
    .then(function (response) {
      const action = receiveUsersAdmin(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};