import React, {Component} from 'react'
import store from '../store';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {orange500, blue500, gray500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
const addStyle = {
  width:5
};
const styles = {
  chip: {
    margin: 4,
  },
};
const showCheckboxes = false;
const products = [{id:1, name:"Hillary's Pantsuit",quantity:1, description:"LALA",price:12,photoURL:"http://placehold.it/250x150",categories:['Clothing'] },
                  {id:2, name:"Elijah Woods's Frodo Ring",quantity:1, description:"HAHA",price:300,photoURL:"http://placehold.it/250x150",categories:['Clothing'] }]

export class Cart extends Component {

  constructor() {
    super()
    this.state = store.getState();

    this.del = this.del.bind(this);

  }
  componentWillMount () {
      store.subscribe(() => this.setState(store.getState()));
  }
  update( firstName, lastName, username, email, password){



    var id = this.state.auth.id;
    var user = {firstName: firstName,
                lastName: lastName,
                username: username,
                email: email
              }
    var url = `/api/users/${id}`;
    console.log("url", url);
    axios.put(url,user)
    .then(function(res){
      console.log("RES",res);
      if(res.status ==200){
        location.reload();
        //console.log("Success!!");
      }
    })
    .catch(function (err) {
      console.error("ERR",err)
    });

  }

  del( product){
    console.log("del", product.product.id);
    var id = product.product.id;
    url = `/api/products/${id}`;
    // axios.del(url)
    // .then(function(res){
    //   console.log("ressss",res)
    //   var tmp = store.getState();
    //   console.log("TMP", tmp);
    // })

  }

  render() {
    console.log("products", products);
  return (
    <div>
      <Table selectable={showCheckboxes} >
        <TableHeader  displaySelectAll={showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableHeaderColumn>Photo</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
            <TableHeaderColumn>Categories</TableHeaderColumn>
            <TableHeaderColumn>Delete</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={showCheckboxes} >
             { products && products.map(product => (
                <TableRow key={product.id}>
                  <TableRowColumn><img src={product.photoURL}/></TableRowColumn>
                  <TableRowColumn>{product.name}</TableRowColumn>
                  <TableRowColumn>{product.description}</TableRowColumn>
                  <TableRowColumn>
                      <TextField defaultValue = {product.quantity} name="quantitytext"  />
                  </TableRowColumn>
                  <TableRowColumn>
                    {
                      product.categories && product.categories.map((category,idx) => (
                         <Chip key = {idx} style={styles.chip}>{category}</Chip>
                      ))
                    }
                  </TableRowColumn>
                  <TableRowColumn><RaisedButton type="submit" label="DELETE" primary={true} onClick={evt=>{ evt.preventDefault(); this.del({product});}}/></TableRowColumn>
                </TableRow>
              ))
            }




        </TableBody>
      </Table>

    </div>



)}

}

import {connect} from 'react-redux'
const mapStateToProps = ({auth, user}) => ({
  auth, user
})
export default connect (
  mapStateToProps,
  null,
) (Cart)

