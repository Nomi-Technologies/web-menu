import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

const RestaurantScreenWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
`;

const RestaurantLogoBar = styled.a`
  position: relative;
  flex: 0 0 auto;

  & svg {
    height: 50px;
    display: block;
    margin: 5px auto;
  }
`;

export default function RestaurantScreen(props) {

  return (
    <RestaurantScreenWrapper>
      <RestaurantLogoBar href='https://www.bacariwadams.com/'>
        <ReactSVG 
          wrapper='span'
          src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/restaurant_logos/bacari.svg`}
        />
      </RestaurantLogoBar>
      <MenuScreen restaurantId={props.restaurantId}/>
    </RestaurantScreenWrapper>
  );
}