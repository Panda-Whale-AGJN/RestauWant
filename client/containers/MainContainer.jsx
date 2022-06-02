import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions/actions.jsx'
import { Link, Outlet } from 'react-router-dom';

import SearchContainer from '../components/Search.jsx';
import RestaurantDisplay from '../components/RestaurantDisplay.jsx';


const mapStateToProps = state => ({
  latitude: state.users.latitude,
  longitude: state.users.longitude,
  isLoggedIn: state.users.isLoggedIn,
});

const MainContainer = props => {

  const { latitude, longitude, isLoggedIn } = props;

  return (
    <div className = "MainContainer">
      { isLoggedIn ? <div>Welcome back, user </div> : <Link id="login" to="/api/login"> Login </Link> }
      <br></br>
      { isLoggedIn ? <div>Welcome back, user </div> : <Link id="sign up" to="/api/signup"> Sign Up </Link> }
      <br></br>
      Longitude: {longitude} 
      <div></div>
      Latitude: {latitude}
      <SearchContainer />
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      </ul>
      <RestaurantDisplay />
      <Outlet/>
    </div>
  ); 
};

export default connect(mapStateToProps, null)(MainContainer);