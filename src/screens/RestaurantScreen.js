import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import './MenuScreen.css';

const { apiBaseUrl } = require('../config');

export default function RestaurantScreen(props) {

  return (
    <div className='restaurant-screen'>
      <a href='https://www.bacariwadams.com/'
        className='restaurant-logo-bar'>
        <ReactSVG 
          wrapper='span'
          onClick={() => console.log('here')}
          src={`${apiBaseUrl[process.env.NODE_ENV]}/api/assets/restaurant_logos/bacari.svg`}
        />
      </a>
      <MenuScreen restaurantId={props.restaurantId}/>
    </div>
  );
}