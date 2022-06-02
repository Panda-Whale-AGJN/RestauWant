import React from 'react';

const Restaurant = props => {
  
  const {name, imgUrl, price, rating, address } = props;

  return(
    <div className="restaurant" style={{ border: '1px solid black', padding: '10px', margin: '10px'}}>
      <div className="restImage">
        <img src={ imgUrl } alt="" style={{width: '100px', height: 'auto'}}/>
      </div>
      <div>Restaurant Name: {name}</div>
      <div>Address:</div>
      <div>{address.join(' ')}</div>
      <div>Price: {price}</div>
      <div>Rating: {rating}</div>
    </div>
  );
};

export default Restaurant;