import React, {Component} from 'react'
import store from '../store';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export class AdminUsers extends Component {

  render() {
    const {users} = this.props || []

    return (
      <Table>
      </Table>
    )
  }
}


const mapStateToProps = (state) => ({
  allUsers: state.allUsers
})

export default connect (
  mapStateToProps,
  null,
) (AdminUsers)

