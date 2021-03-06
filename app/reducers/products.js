import axios from 'axios'

export default function reducer (state = [], action) {
  switch(action.type) {

    case RECEIVE_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}

// to receive all products stored on server

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
})

export function fetchProducts () {
  return function (dispatch) {
    return axios.get('/api/products')
    .then(function (response) {
      const action = receiveProducts(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};