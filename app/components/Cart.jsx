import React, {Component} from 'react'
import store from '../store';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {orange500, blue500, gray500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import {updateProductQuantityInDb, updateCartId} from '../reducers/cart';
const addStyle = {
  width:5
};
const styles = {
  chip: {
    margin: 4,
  },
};
const Divstyle ={
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
}
const showCheckboxes = false;
const products = [{id:1, name:"Hillary's Pantsuit",quantity:1, description:"LALA",price:12,photoURL:"http://placehold.it/250x150",categories:['Clothing'] },
                  {id:2, name:"Elijah Woods's Frodo Ring",quantity:1, description:"HAHA",price:300,photoURL:"http://placehold.it/250x150",categories:['Clothing'] }]

export class Cart extends Component {

  constructor() {
    super()
    this.state = store.getState();
    this.del = this.del.bind(this);
    this.sub = this.sub.bind(this);
    this.upquantity = this.upquantity.bind(this);
    this.determineQ = this.determineQ.bind(this);
  }

  del(product, index){
    console.log(product, "PRODUCT in delete")
        let q;
    if(product.product.order_product) q = product.product.order_product.quantity;
    else q = product.product.quantity;
    let diff = product.product.price * q;
    let total = this.props.cart.total - diff;
    axios.delete(`/api/orders/${this.props.cart.order_id}/${product.product.id}`, {total: total})
    .then((res) => //{
      // if (res.message == 'product has been removed'){
        axios.get(`/api/orders/${this.props.cart.order_id}`)
        .then(orders => {
          let ordersFromProducts;
          if (orders.data[0]) ordersFromProducts = orders.data[0].products
          else ordersFromProducts = [];
          store.dispatch(updateCartId({user_id:this.props.cart.user_id, order_id:this.props.cart.order_id, products:ordersFromProducts, total: total}))
        })
        .then(() => location.reload() )
        .catch(err => console.log(err.stack))
      //}}
    )

  }

  sub( ){
    console.log("submit form", products);
    //var id = product.product.id;
    //var url = `/api/products/${id}`;
    // axios.del(url)
    // .then(function(res){
    //   console.log("ressss",res)
        // })
  }

  determineQ(product){
    let q;
    if(product.order_product) q = product.order_product.quantity;
    else q = product.quantity;
    return q;
  }
  upquantity(newQuantity, product, productIdx){
    let oldQuantity = product.order_product.quantity //old quantity
    let amountToChange = (Math.abs(newQuantity - oldQuantity)) * product.price;
    let storeTotal = this.props.cart.total
    let tempCart = this.props.cart.products;
    tempCart[productIdx]['order_product']['quantity'] = newQuantity;
    if (oldQuantity < newQuantity) { storeTotal+= amountToChange} //if there are more items to be added, increase the store state total
    else storeTotal -= amountToChange //otherewise, decrease the total
    store.dispatch(updateProductQuantityInDb(tempCart,storeTotal)) //update the store's cart to reflect new product quantity and cart total
    axios.put(`/api/orders/${this.props.cart.order_id}`, {total: storeTotal, user_id: this.props.cart.user_id, products: tempCart})
    .then((res) => console.log(res))
  }

  render() {
  return (
    <div style={Divstyle}>
    <h1>My Cart</h1>
      <Table selectable={showCheckboxes} >
        <TableHeader  displaySelectAll={showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
            <TableHeaderColumn>Categories</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={showCheckboxes}  >
             { this.props.cart.products && this.props.cart.products.map((product, idx) => (
                <TableRow key={product.id}>
                  <TableRowColumn><img src={product.photoURL}/></TableRowColumn>
                  <TableRowColumn>{product.name}</TableRowColumn>
                  <TableRowColumn>{product.description}</TableRowColumn>
                  <TableRowColumn>
                     <select onChange={(e) => this.upquantity(+(e.target.value), product, idx)} defaultValue={this.determineQ({product, idx})}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </TableRowColumn>
                  <TableRowColumn>
                    {
                      product.categories && product.categories.map((category,idx) => (
                         <Chip key = {idx} style={styles.chip}>{category}</Chip>
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn>{product.price}</TableRowColumn>
                  <TableRowColumn><RaisedButton type="submit" label="DELETE" primary={true} onClick={evt=>{ evt.preventDefault(); this.del({product});}}/></TableRowColumn>
                </TableRow>
              ))
            }


            <TableRow>
            </TableRow>
        </TableBody>
      </Table>

      <RaisedButton type="submit" label="SUBMIT" onClick = {evt=>{ evt.preventDefault(); this.sub();}}/>
    </div>



)}

}

import {connect} from 'react-redux'
const mapStateToProps = ({auth, user, cart}) => ({
  auth, products, cart
})
export default connect (
  mapStateToProps,
  null,
) (Cart)

