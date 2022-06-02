import * as types from '../actions/types.jsx';


const initialState = {
  restaurantsToBeDisplayed: [],
  allRestaurants: [],
  categories: {}, // {'namesofcategory': 'boolean'}
  checkCount: 0
};

const RestaurantsReducer = (state = initialState, action) => {
  let newCategories, restaurantsToBeDisplayed, allRestaurants, checkCount;

  switch (action.type) {
    case types.GET_RESTAURANT_DATA:
      restaurantsToBeDisplayed = action.payload;
      
      newCategories = {};

      for (let i = 0; i < restaurantsToBeDisplayed.length; i++) {
        const categories = restaurantsToBeDisplayed[i].categories;
        for (let j = 0; j < categories.length; j++) {
          const category = categories[j].title;
          if (!Object.hasOwn(newCategories, category)) {
            newCategories[category] = false;
          }
        }
      }
      //console.log('newCategories: ', newCategories);
      //console.log(restaurantsToBeDisplayed);
      return {
        ...state,
        categories: newCategories,
        restaurantsToBeDisplayed: restaurantsToBeDisplayed,
        allRestaurants: restaurantsToBeDisplayed,
      };
      
    case types.SET_CATEGORIES:

      newCategories = { ... state.categories };
      newCategories[action.payload.name] = action.payload.checked;

      checkCount = 0;
      if (action.payload.checked) {
        checkCount = state.checkCount + 1;
      } else {
        checkCount = state.checkCount - 1;
      }
      
      allRestaurants = state.allRestaurants;

      restaurantsToBeDisplayed = [];
      //console.log(checkCount);
      if (checkCount === 0) {
        restaurantsToBeDisplayed = allRestaurants;
      } else {
        for (const [category, checked] of Object.entries(newCategories)) {
          if (checked) {
            for (let i = 0; i < allRestaurants.length; i++) {
              const restaurant = allRestaurants[i];
              for (let j = 0; j < restaurant.categories.length; j++) {
                if (restaurant.categories[j].title === category) {
                  restaurantsToBeDisplayed.push(restaurant);
                }
              } 
            }
          }
        }
      }
      /*
      if (action.payload.checked) {
        console.log("state: ", state.restaurantsToBeDisplayed)
        
      }
      */
      //console.log('not display ', restaurantsToBeDisplayed);
      return {
        ...state,
        categories: newCategories,
        restaurantsToBeDisplayed,
        checkCount
      };

    default:
      return state;
  }
};


export default RestaurantsReducer;