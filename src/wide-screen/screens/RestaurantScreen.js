import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactComponent as NomiTopBottomLogo } from 'components/nomi-topbottom.svg';
import styled from 'styled-components';
import MenuTabNav from '../components/MenuTabNav';

const RestaurantScreen = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  background-color: #d8e2f8;
`;

const Header = styled.div`
  position: relative;
  flex: 0 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  /* White */
  background: #FFFFFF;
  /* card-shadow-3 */
  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
`;

const NomiLogo = styled(NomiTopBottomLogo)`
  position: relative;
  display: inline-block;
`;

const RestaurantImgLogo = styled.img`
  display: inline-block;

  
  height: 28px;
  width: 84px;
`;

const FilterToggleSwitch = styled.div`
  /* Rectangle 150 */

  height: 16px;
  width: 16px;

  margin-left: 5%;

  background: #FFFFFF;
  /* card-shadow-3 */

  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
  border-radius: 10px;
`;

const PageError = styled.div`
  position: relative;
  flex: 0 0 auto;
  text-align: center;
  color: #FF726F;
  margin-top: 5%;
  font-size: 24px;
  font-weight: bold;
`;

const Loading = styled.div`
  position: relative;
  flex: 0 0 auto;
  text-align: center;
  margin-top: 5%;
  font-size: 32px;
  font-weight: bold;
`;

const HeaderColumns = styled.div`
  text-align: center;
`;

export default (props) => {

  return (
    <RestaurantScreen>
      <Header>
        <HeaderColumns style={{ width: '20%' }}>
          {
            props.restaurantId ?
            <RestaurantImgLogo
              alt={`${props.restaurantName} logo`}
              src={`${process.env.REACT_APP_API_BASE_URL}/api/images/restaurants/${props.restaurantId}`}
            /> : <></>
          }
        </HeaderColumns>
        <HeaderColumns style={{ width: '60%' }}>
          <MenuTabNav
            {...props}
          />
        </HeaderColumns>
        <HeaderColumns style={{ width: '20%' }}>
          <NomiLogo
            width='70px'
            height='28px'
          />
        </HeaderColumns>
      </Header>
      {props.dishesByMenu.length > 0 ?
        <MenuScreen
          restaurantName={props.restaurantName}
          menu={props.dishesByMenu[props.selectedMenuIndex]}
        />
        :
        (
          props.error ?
          <PageError>There was an error loading this page. Please try reloading the page or contact the Nomi team by filling out a form at dinewithnomi.com</PageError> :
          <Loading>Restaurant Menu Loading...</Loading>
        )
      }
    </RestaurantScreen>
  );
}
