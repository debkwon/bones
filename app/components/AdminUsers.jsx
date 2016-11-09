import React, {Component} from 'react'
import store from '../store';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import {grey200} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';

export class AdminUsers extends Component {

  constructor() {
    super()
    this.handleAdminChange.bind(this)
  }

  handleAdminChange() {
    // send stuff to the state to toggle user's admin status
  }

  render() {

    const { adminUsers } = this.props || []

    return (
      <Paper style={{margin: 20, padding: 5, backgroundColor: grey200}}>
        <Subheader style={{margin: 20}}>All Users</Subheader>
        <Table selectable={false} >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Admin</TableHeaderColumn>
              <TableHeaderColumn>Created On</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              adminUsers && adminUsers.map(user => (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.firstName}</TableRowColumn>
                  <TableRowColumn>{user.lastName}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>{user.username}</TableRowColumn>
                  <TableRowColumn>
                    <RadioButtonGroup name="isAdmin" defaultSelected={user.admin} onChange={this.handleAdminChange}>
                      <RadioButton
                        value={true}
                        label="Yes"
                      />
                      <RadioButton
                        value={false}
                        label="No"
                      />
                    </RadioButtonGroup>
                  </TableRowColumn>
                  <TableRowColumn>{user.created_at.slice(0,10)}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton type="delete" label="Delete User" secondary={true}/>
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
  adminUsers: state.adminUsers
})

export default connect (
  mapStateToProps,
  null,
) (AdminUsers)

