import axios from 'axios'
import store from '../store'
import {updateCartId} from './cart'
const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        return dispatch(authenticated(user))
      })
      .then(res => axios.get(`/api/orders/users/${res.user.id}/not%20submitted`))
      .then(res=> { if(res.data.length !== 0) axios.get(`/api/orders/ordersproducts/${res.data[0].id}`)})
      .then(res=>{
         if(res && res.data.length !== 0){
          dispatch(updateCartId({user_id:res.data[0].user_id, order_id:res.data[0].id, products:res.data[0].products}))
         }
      })

      .catch(failed => console.log(failed))

// export const getcart =  user=>
//   dispatch =>
//     axios.get(`/api/orders/users/${user.id}/not%20submitted`)
//     .then((orders)=>{
//       console.log("ordres",ordres);
//       dispatch(updateCartId(orders))
//     })

export default reducer
