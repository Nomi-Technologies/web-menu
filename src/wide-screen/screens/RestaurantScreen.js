import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import './MenuScreen.css';

const { apiBaseUrl } = require('../../config');

export default function RestaurantScreen(props) {

  return (
    <div className='web-restaurant-screen'>
      <MenuScreen restaurantId={props.restaurantId}/>
    </div>
  );
}
