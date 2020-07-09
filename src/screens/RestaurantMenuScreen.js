import React from 'react';
import MobileRestaurantScreen from '../narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from '../wide-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { withUserAgent } from 'react-useragent';

function RestaurantMenuScreen(props) {
  let { restaurant_identifier } = useParams();
  if (window.innerWidth < 1440) {
    return <MobileRestaurantScreen restaurantId={restaurant_identifier}/>
  } else {
    return <WebRestuarantScreen restaurantId={restaurant_identifier}/>
  }
}

export default withUserAgent(RestaurantMenuScreen);
