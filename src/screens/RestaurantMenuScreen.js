import React from 'react';
import MobileRestaurantScreen from '../narrow-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { withUserAgent } from 'react-useragent';

function RestaurantMenuScreen(props) {
  let { restaurant_identifier } = useParams();
  if (props.ua.mobile) {
    return <MobileRestaurantScreen restaurantId={restaurant_identifier}/>
  } else {
    return <MobileRestaurantScreen restaurantId={restaurant_identifier}/>
  }
}

export default withUserAgent(RestaurantMenuScreen);