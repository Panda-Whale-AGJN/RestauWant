import React from 'react';
import { connect } from 'react-redux';

import Restaurant from './Restaurant.jsx';
import Filter from './Filter.jsx';
import * as actions from '../actions/actions.jsx';

const mapStateToProps = state => ({
  restaurantsToBeDisplayed: state.restaurants.restaurantsToBeDisplayed,
  allRestaurants: state.restaurants.allRestaurants,
  categories: state.restaurants.categories,
  checkCount: state.restaurants.checkCount,
});

const mapDispatchToProps = dispatch => ({
  setCategories: (name, checked) => {
    dispatch(actions.setCategories(name, checked));
  }
});

const RestaurantDisplay = props => {

  const { restaurantsToBeDisplayed, categories, setCategories } = props;
  const restaurantsArr = [];
  
  for (let i = 0; i < restaurantsToBeDisplayed.length; i++) {
    const { id, name, price, rating, location, image_url} = restaurantsToBeDisplayed[i];
    restaurantsArr.push(<Restaurant id={id} imgUrl={image_url} name={name} address={location.display_address} price={price} rating={rating} key={i}/>);
  }

  const filterArr = [];
  for (const [key, value] of Object.entries(categories)) {
    filterArr.push(
      <Filter key={key} category={key} checked={value} setCategories={setCategories}/>
    );
  }

  return (
    <div className="Display" style={{margin: '20px'}}>
      <h1>Restaurants</h1>
      { filterArr }
      { restaurantsArr }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDisplay);