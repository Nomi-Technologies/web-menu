import React from 'react';
import MenuScreen from './MenuScreen';
import './MenuScreen.css';

export default function RestaurantScreen(props) {

  return (
    <div className='web-restaurant-screen'>
      <MenuScreen restaurantId={props.restaurantId}/>
    </div>
  );
}
