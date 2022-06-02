import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
// import from child components...

const mapStateToProps = state => ({
  isLoggedIn: state.users.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  
});


// const checkLoginInfo = async () => {
//   const response = await axios.get('/');
//   return response;
// };

let usernameInput;
function usernameData (e) {
  // console.log('usernameInput', usernameInput);
  usernameInput = e.target.value;
  return usernameInput;
}

let passwordInput;
function passwordData (e) {
  // console.log('passwordInput', passwordInput);
  passwordInput = e.target.value;
  return passwordInput;
}

const LoginContainer = props => {
  
  return (
    <div>
      <input id="username" placeholder="username" onChange= { usernameData } required></input>
      <br></br><br></br>
      <input id="password" placeholder="password" onChange= { passwordData }></input>
      <br></br><br></br>
      <Link id="signUpButton" to="/api/signup"> Sign up </Link>
      <br></br><br></br>
      <button id="loginButton" onClick={() => console.log( 'this will check if user is logged in' ) }> Login </button>
      <Outlet/>
    </div>
  );
};

export default connect (mapStateToProps, mapDispatchToProps)(LoginContainer);