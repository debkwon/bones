import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export const Login = ({ login }) => (
<div className='login-form'>
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <label>Username</label><br />
    <input name="username" /><br />
    <label>Password</label><br />
    <input name="password" type="password" /><br />
    <input type="submit" value="Login" /><br />
  </form>

<h3>Sign in with Facebook or Google:</h3>

</div>
)

export default connect (
  state => ({}),
  {login},
) (Login)




