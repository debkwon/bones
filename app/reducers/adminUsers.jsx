import axios from 'axios'
import {fetchReviewsAdmin} from './adminReviews'

export default function reducer (state = [], action) {
  switch(action.type) {

    case RECEIVE_USERS_ADMIN:
      return action.allUsers;

    default:
      return state;
  }
}

const RECEIVE_USERS_ADMIN = 'RECEIVE_USERS_ADMIN';

export const receiveUsersAdmin = (allUsers) => ({
  type: RECEIVE_USERS_ADMIN, allUsers
});

export const fetchUsersAdmin = () => {
  return function (dispatch) {
    axios.get(`/api/users/`)
    .then(function (response) {
      const action = receiveUsersAdmin(response.data);
      dispatch(action);
      dispatch(fetchReviewsAdmin());
    })
    .catch(err => console.error(err.stack));
  };
};