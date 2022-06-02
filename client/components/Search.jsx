import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.jsx';


const mapStateToProps = state => ({
  longitude: state.users.longitude,
  latitude: state.users.latitude,
  isLoggedIn: state.users.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  loadRestaurants: async (input) => {
    const restaurantData = await actions.getRestaurants(input);
    dispatch(actions.restaurantActionCreator(restaurantData));
  }
});

const SearchContainer = props => {

  const { latitude, longitude, isLoggedIn } = props;

  let searchInput;
  function searchData (e) {
    searchInput = e.target.value;
    return searchInput;
  }

  return ( 
    <div className = "Search">
      <input type="text"id="searchBar"placeholder="Where are you?" onChange={ searchData } ></input>
      <br></br><br></br>
      <button id="getRestaurantButton" onClick={() => {props.loadRestaurants( searchInput );}}>find eats!</button>
      {/* <Search /> */}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);


// export default connect(mapStateToProps, null)(SearchContainer);