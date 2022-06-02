import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

//import App from '../client/App.jsx';
import store from '../client/store.jsx';

//all rendered by app
import MainContainer from '../client/containers/MainContainer.jsx';
import LoginContainer from '../client/containers/LoginContainer.jsx';
import SignUpContainer from '../client/containers/SignUpContainer.jsx';

//rendered by main container (which also renders restaurant display)
import Search from '../client/components/Search.jsx';

//rendered by restaurant display
import Restaurant from '../client/components/Restaurant.jsx';
import Filter from '../client/components/Filter.jsx';


describe('unit testing react components', () => {
  let component;

  describe('Restaurant', () => {

    const props = {
      imgUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-02/20/20/asset/4e32a629a2f7/sub-buzz-520-1582231948-7.jpg?downsize=900:*&output-format=auto&output-quality=auto',
      name: 'MacDonald',
      address: ['123 Hamburger Ln', 'New York, NY 12345'], //array of 2 strings, one street and one city/state/zip
      price: '$', //string
      rating: 3, //number
    };

    it('should display an Image, Restaurant Name, Address, Price, and Rating', () => {
      component = render(<Restaurant {...props} />);
      //check that all props are displayed


      // const propsEntries = Object.values(props);
      // for(let i = 0; i < propsEntries.length; i++){
      //    expect(component.getByText(propsEntries[i])).toBeInstanceOf(Node); //from testing approach lecture
      // }

    
    });
    
  });  
  
      
  describe('Filter', () => {

    const props = {
      category: 'Pizza',
      checked: false,
      setCategories: jest.fn(),
    };

    beforeEach(() => {
      component = render(<Filter {...props} />);
    });

    it('displays a checkbox and category name', () => {
      
    });

    it('changes checked property (of html input) value to true when checkbox is clicked', () => {

    });

    it('calls setCategories when checkbox is clicked', () => {
    //   fireEvent.change(screen.getByRole('checkbox'));
    //   expect(props.setCategories).toHaveBeenCalledTimes(1);
    });

  });

  
  describe('Search', () => {

    it('', () => {});

  });



});



describe('react-redux integration tests', () => {

  //check page loads with empty state before any user interaction  
  describe('empty state before interactions', () => {

    beforeEach(async () => {
      const app = await render(
        //add components that render on initial page load
        <Provider store={store}>
                
        </Provider>
      );
    });

    //check if correct buttons/display elements are rendered in initial page load
    it('loads the page with search bar and login link', () => {

    });

    //check if correct headings are displayed on initial page load
    it('loads the page with correct headings', () => {

    });

    //check that no restaurants or filter boxes are rendered
    it('renders no restaurants and no filters', () => {

    });

  });

  //check restaurants display after searching 
  describe('displaying restaurants', () => {

    beforeEach(async () => {
      const app = await render(
        //add components that render on initial page load
        <Provider store={store}>
                  
        </Provider>
      );
    });

    //check that search fetches and displays all restaurants fetched
    it('search gets and displays all resturants', () => {

    });

    //check that filter properly filters out restaurants not in chosen categories
    it('filter filters and displays resturants to display', () => {

    });



  });


});