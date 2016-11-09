'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {grey200} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

// we need name, quantity, description, price, categories, photoURL

export class AdminProducts extends React.Component {

  constructor () {
    super()
    this.state = {
      value: 1,
    }
    this.handleRequestDelete.bind(this)
    this.handleChange.bind(this)
  }

  handleChange (event, index, value) {
    this.setState({value});
  }

  handleRequestDelete () {
    alert('You clicked the delete button.');
  }

  render() {

    const { adminProducts } = this.props || [];
    
    let idx = 0;
    return (
      <div>
        <Paper style={{margin: 20, padding: 5, backgroundColor: grey200}}>
          <Subheader style={{margin: 20}}>All Products</Subheader>
          <Table selectable={false} >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Photo URL</TableHeaderColumn>
                <TableHeaderColumn>Categories</TableHeaderColumn>
                <TableHeaderColumn>Created On</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              { 
                adminProducts && adminProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableRowColumn>
                      <TextField id="name-field"
                        defaultValue={product.name}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField id="description-field"
                        defaultValue={product.description}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField id="price-field"
                        defaultValue={product.price}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField id="quantity-field"
                        defaultValue={product.quantity}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField id="photoURL-field"
                        defaultValue={product.photoURL}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      { product.categories && product.categories.map(category => (
                        <Chip id={++idx} style={{margin:5}}
                          onRequestDelete={this.handleRequestDelete}>
                          {category}
                        </Chip>
                      ))}
                    </TableRowColumn>
                    <TableRowColumn>{product.created_at.slice(0,10)}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton type="delete" label="Delete Product" primary={false} secondary={true}/>
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>  
            </TableFooter>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  adminProducts: state.adminProducts,
 })


export default connect(mapStateToProps, null)(AdminProducts);