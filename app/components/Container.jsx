import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import WhoAmI from './WhoAmI';
import AppBar from 'material-ui/AppBar';


export class Container extends Component {

  render() {

    console.log(this.props)
    return (
      <div className="mdl-layout mdl-js-layout">
      <nav>
        <div id="nav-top">
          <div>
            <div>
              <Link to='/'><img src="/newLogo.png" alt="Selleb: your source for celebrity memoribilia"/></Link>
            </div>
          </div>
          <ul>
            <li>{this.props.auth ? <Link to='/admin'>Admin</Link> : <div/>}</li>
            <li><Link to='/orders'>Orders</Link></li>
            <li>{!this.props.auth ? <Link to='/login' className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Login</Link> : <WhoAmI />}</li>
            <li><i className="fa fa-shopping-cart" aria-hidden="true"> </i>Cart</li>
          </ul>
        </div>
        <div id="main-menu">
          <AppBar>
            <ul>
              <li><Link to='/'>All</Link></li>
              <li><Link to='/celebs'>Browse by Celebrity</Link></li>
            </ul>
          </AppBar>
        </div>
      </nav>
      {this.props.children}
      <footer>
        <p>$elleb<br/>&copy; 2016</p>
      </footer>
      </div>
    )}
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect (
  mapStateToProps,
  null
) (Container)
