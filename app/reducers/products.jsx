// import axios from 'axios'

export default function reducer (state = null, action) {
  switch(action.type) {

    case ALL_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}

const ALL_PRODUCTS = 'ALL_PRODUCTS';
export const allProducts = products => ({
  type: ALL_PRODUCTS, products
})

export const getProducts = () => 
  dispatch =>
    axios.get('api/products')
      .then(res => dispatch(allProducts(res.data))) // data, not body?
      .catch(err => console.error('Fetching products unsuccessful', err))