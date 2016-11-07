import axios from 'axios'


// orders reducer

export default function reducer (state = [], action) {
  switch(action.type) {
    
    case RECEIVE_ORDERS:
      return action.orders;

    default:
      return state;
  }
}

// to get all orders stored on server

const RECEIVE_ORDERS = 'RECEIVE_ORDERS';

export const receiveOrders = (orders, userId) => ({
  type: RECEIVE_ORDERS, orders, userId
})

export const fetchOrders = (userId) => {
  console.log('the userId:', userId)
  return function (dispatch) {
    // TODO: need to use /api/orders/users/:userid, but don't know how to get logged in user info from state

    axios.get(`/api/orders/users/${userId}`)
    .then(function (response) {
      const action = receiveOrders(response.data);
      return dispatch(action);
    })
    .catch(err => console.error(err.stack));
  };
};