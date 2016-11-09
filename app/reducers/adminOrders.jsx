import axios from 'axios'
import {fetchUsersAdmin} from './adminUsers'

export default function reducer (state = [], action) {
  switch(action.type) {

    case RECEIVE_ORDERS_ADMIN:
      return action.adminOrders;

    default:
      return state;
  }
}

const RECEIVE_ORDERS_ADMIN = 'RECEIVE_ORDERS_ADMIN';

export const receiveOrdersAdmin = (adminOrders) => ({
  type: RECEIVE_ORDERS_ADMIN, adminOrders
})

export const fetchOrdersAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/orders/`)
    .then(function (response) {
      const action = receiveOrdersAdmin(response.data);
      dispatch(action);
      dispatch(fetchUsersAdmin())
    })
    .catch(err => console.error(err.stack));
  };
};