import axios from 'axios'
import {fetchOrdersAdmin} from './adminOrders'

export default function reducer (state = [], action) {
  switch(action.type) {

    case RECEIVE_PRODUCTS_ADMIN:
      return action.allProducts;

    default:
      return state;
  }
}

const RECEIVE_PRODUCTS_ADMIN = 'RECEIVE_PRODUCTS_ADMIN';

export const receiveProductsAdmin = (allProducts) => ({
  type: RECEIVE_PRODUCTS_ADMIN, allProducts
})

export const fetchProductsAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/products/`)
    .then(function (response) {
      const action = receiveProductsAdmin(response.data);
      dispatch(action);
      dispatch(fetchOrdersAdmin());
    })
    .catch(err => console.error(err.stack));
  };
};