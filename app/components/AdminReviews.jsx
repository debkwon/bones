import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {grey200} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';

export class AdminReviews extends React.Component {

  render() {

    const { adminReviews } = this.props || [];
    
    return (
      <Paper style={{margin: 20, padding: 5, backgroundColor: grey200}}>
        <Subheader style={{margin: 20}}>All Reviews</Subheader>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Stars</TableHeaderColumn>
              <TableHeaderColumn>Text</TableHeaderColumn>
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>User</TableHeaderColumn>
              <TableHeaderColumn>Product</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              adminReviews && adminReviews.map(review => (
                <TableRow key={review.id}>
                  <TableRowColumn>{review.stars}</TableRowColumn>
                  <TableRowColumn>{review.text}</TableRowColumn>
                  <TableRowColumn>{review.created_at.slice(0,10)}</TableRowColumn>
                  <TableRowColumn>{review.user_id}</TableRowColumn>
                  <TableRowColumn>{review.product_id}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton type="delete" label="Delete Review and Flag User" secondary={true}/>
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}


const mapStateToProps = (state) => ({
  adminProducts: state.adminProducts, 
  adminReviews: state.adminReviews
})

export default connect (
  mapStateToProps,
  null
) (AdminReviews)