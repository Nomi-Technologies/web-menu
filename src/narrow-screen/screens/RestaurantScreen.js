import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import './MenuScreen.css';

export default function RestaurantScreen(props) {

  return (
    <div className='restaurant-screen'>
      <a href='https://www.bacariwadams.com/'
        className='restaurant-logo-bar'>
        <ReactSVG 
          wrapper='span'
          src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/restaurant_logos/bacari.svg`}
        />
      </a>
      <MenuScreen restaurantId={props.restaurantId}/>
    </div>
  );
}