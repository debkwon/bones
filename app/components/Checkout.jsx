import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {browserHistory} from 'react-router';

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.submitOrder = this.submitOrder.bind(this);
  }
  submitOrder(target){
    let address = `${target.address.value}, ${target.city.value}, ${target.state.value}, ${target.zip_code.value} `
    axios.put(`/api/orders/submitorder/${this.props.cart.order_id}`,{email:target.email.value, address: address})
    .then(()=> {
      window.localStorage.removeItem('orderId')
      browserHistory.push("/")
      })
    .catch(err=> console.log(err.stack))
  }

  render() {
  const { currentProduct } = this.props || {}
  return (
  <div  className="mdl-grid">
    <form className="mdl-cell mdl-cell--4-col" onSubmit = {evt => {
      evt.preventDefault()
      this.submitOrder(evt.target)
    } }>
      <TextField
         defaultValue= ""
         name= "email"
         hintText="Email"
      /><br />
         <TextField
           defaultValue= ""
           name= "address"
           type= "text"
           hintText="Street Address"
         /><br />
         <br />
         <TextField
           defaultValue= ""
           name= "city"
           type= "text"
           hintText="City"
         /><br />
         <TextField
           defaultValue= ""
           name= "state"
           type= "text"
           hintText="State"
         /><br />
         <TextField
           defaultValue= ""
           name= "zip_code"
           type= "text"
           hintText="Zip Code"
         /><br />
       <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">SUBMIT
       </button>
    </form>
  </div>
)
}
}
const mapStateToProps = ({cart}) => ({
  cart
})
export default connect (
  mapStateToProps,
  null,
) (Checkout)