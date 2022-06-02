import subject from '../client/reducers/RestaurantsReducer.jsx';


describe('Restaurants Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      restaurantsToBeDisplayed: [],
      allRestaurants: [],
      categories: {},
      checkCount: 0
    };
  });
    
  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(subject(state, action)).toBe(state);
    });
  });


  describe('GET_RESTAURANTS', () => {
    
    const action = {
        type: 'GET_RESTAURANTS',
        payload: [
            {
              name: 'Ess A Bagel',
              address: '123 3rd Ave',
              price: '$3',
              rating: 4,
              categories: [{alias: 'bagel', title: 'Bagel'}, {alias: 'coffee', title: 'Coffee'}]
            },
            {
              name: 'Nathans Slop House',
              address: '1 Donttrackme St',
              price: '$1',
              rating: 1,
              categories: [{alias: 'vegan', title: 'Vegan'}, {alias: 'newamerican', title: 'New American'}]
            }
        ]
    }

    it('will add fetched restaurants to state.restaurantsToBeDisplayed', () => {
      const { restaurantsToBeDisplayed } = subject(state, action);
      expect(restaurantsToBeDisplayed).toEqual(action.payload);
    });

    it('will add fetched restaurants to state.allRestaurants', () => {
      const { allRestaurants } = subject(state, action);
      expect(allRestaurants).toEqual(action.payload);
    });

    it('will add categories to state.categories', () => {
      const { categories } = subject(state, action);
      expect(categories).toEqual({Bagel: false, Coffee: false, Vegan: false, 'New American': false});
    });

    it('does not mutate state', () => {
      const currentState = subject(state, action);
      expect(currentState).not.toBe(state);
    });

  });

  
  describe('SET_CATEGORIES', () => {

    const action = {
      type: 'SET_CATEGORIES',
      payload: {
          name: 'Coffee',
          checked: true,
      }        
    };

    it('set categories assigns only restaurants included by it to restaurants to display', () => {});

    it('increments checkCount property on state', () => {});

    it('can handle multiple categories indicated in filter', () => {});

    it('reducer does not mutate state directly', () => {
      const currentState = subject(state, action);
      expect(currentState).not.toBe(state);
    })
  });
  









  
}); //don't put any other code below this line