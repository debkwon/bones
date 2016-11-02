import axios from 'axios'

export default function reducer (state = null, action) {
  switch(action.type) {

    case RECEIVE_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS, products
})

export const fetchProducts = () => {
  return function (dispatch) {
    axios.get('/api/products')
      .then(res => {
        console.log("These are your products:", products)
        dispatch(receiveProducts(products))
      })
      .catch(err => console.error('Fetching products unsuccessful', err));
  };
};

