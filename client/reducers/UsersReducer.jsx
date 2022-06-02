import * as types from '../actions/types.jsx';

// initial state where the default longitude & latitude = san francisco longitude and latitude
// case for the action: GET_USER_LOCATION -> updates the state to the action.payload longitude and latitude

const initialState = {
  longitude: 0,
  latitude: 0,
  isLoggedIn: false,
};

const UsersReducer = (state = initialState, action) => {

  switch(action.type) {
    case types.GET_USER_LOCATION:
      return {
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        isLoggedIn: action.payload.isLoggedIn,
      };

    default:
      return state;
  }
};

export default UsersReducer;