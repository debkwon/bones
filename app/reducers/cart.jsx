const reducer = (state=null, action) => {
  switch(action.type) {
    case INITIAL_CARTS:
        return action.orders

   }
     return state
}
const INITIAL_CARTS = 'INITIAL_CARTS';

// const AUTHENTICATED = 'AUTHENTICATED'
// const UPDATE_USER = 'UPDATE_USER'
// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

export const updateCartId = orders => ({
    type: INITIAL_CARTS,
    orders
})



// export const login = (username, password) =>
//   dispatch => {
//     const body = {username, password}
//     console.log('req body=', body)
//     return axios.post('/api/users', body)
//       .then(() => dispatch(whoami()))
//   }

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         if (!Object.keys(user).length) {
//           return dispatch(authenticated(null))
//         }
//         dispatch(authenticated(user))
//       })

export default reducer