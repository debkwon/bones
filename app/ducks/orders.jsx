import axios from 'axios'


// orders reducer

export default function reducer (state = [], action) {
  switch(action.type) {
    
    case RECEIVE_ORDERS:
      return action.orders;

    // TODO: how to get orders from the state?

    case SHOW_PROCESSING:
      return action.orders.filter(o => o.status === 'processing');
    case SHOW_SHIPPED:
      return action.orders.filter(o => o.status === 'shipped');
    case SHOW_DELIVERED:
      return action.orders.filter(o => o.status === 'delivered');
    case SHOW_CANCELLED:
      return action.orders.filter(o => o.status === 'cancelled');
    default:
      return state;
  }
}

// to get all orders stored on server

const RECEIVE_ORDERS = 'RECEIVE_ORDERS';

export const receiveOrders = orders => ({
  type: RECEIVE_ORDERS, orders
})

export function fetchOrders () {
  return function (dispatch) {
    return axios.get('/api/orders')
    .then(function (response) {
      const action = receiveOrders(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};



// to filter orders

const SHOW_CANCELLED = 'SHOW_CANCELLED'
const SHOW_DELIVERED = 'SHOW_DELIVERED'
const SHOW_SHIPPED = 'SHOW_SHIPPED'
const SHOW_PROCESSING = 'SHOW_PROCESSING'

export const filterOrders = (orders, status) => ({
  type: FILTER_ORDERS, orders, status
});