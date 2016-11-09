import axios from 'axios'

export default function reducer (state = [], action) {
  switch(action.type) {
      
    case RECEIVE_REVIEWS_ADMIN:
      return action.allReviews;

    default:
      return state;
  }
}

const RECEIVE_REVIEWS_ADMIN = 'RECEIVE_REVIEWS_ADMIN';

export const receiveReviewsAdmin = (allReviews) => ({
  type: RECEIVE_REVIEWS_ADMIN, allReviews
})

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