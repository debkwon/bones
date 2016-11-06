'use strict'

import React, { Component } from 'react';
import { Link } from 'react-router';
import { render } from 'react-dom';
import { connect } from 'react-redux';

export default class OrdersPanel extends React.Component {
  render () {
    return (
      <ul>
        <li>Eddard</li>
        <li>Catelyn</li>
        <li>Robb</li>
        <li>Sansa</li>
        <li>Brandon</li>
        <li>Arya</li>
        <li>Rickon</li>
      </ul>
    )
  }



}