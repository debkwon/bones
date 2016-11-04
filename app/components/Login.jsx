import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export const Login = ({ login }) => (
  <div>
     <form onSubmit = {evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
       <p> <TextField
          hintText="Styled Hint Text"
          hintStyle={styles.errorStyle}
        /><br /></p>
         <TextField
           hintText="Custom error color"
           errorText="This field is required."
           errorStyle={styles.errorStyle}
         /><br />
         <TextField
           hintText="Custom Underline Color"
           underlineStyle={styles.underlineStyle}
         /><br />
         <TextField
           hintText="Custom Underline Focus Color"
           underlineFocusStyle={styles.underlineStyle}
         /><br />
         <TextField
           floatingLabelText="Styled Floating Label Text"
           floatingLabelStyle={styles.floatingLabelStyle}
           floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
         /> <br />
       <RaisedButton label="Secondary" />
    </form>
  </div>
);

// export default TextFieldExampleCustomize;


// export const Login = ({ login }) => (
// <div className='login-form'>
//   <form onSubmit={evt => {
//     evt.preventDefault()
//     login(evt.target.username.value, evt.target.password.value)
//   } }>
//     <label>Username</label><br />
//     <input name="username" /><br />
//     <label>Password</label><br />
//     <input name="password" type="password" /><br />
//     <input type="submit" value="Login" /><br />
//   </form>

// <h3>Sign in with Facebook or Google:</h3>

// </div>
// )

export default connect (
  state => ({}),
  {login},
) (Login)




