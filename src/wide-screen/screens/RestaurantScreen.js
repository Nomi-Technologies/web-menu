import React, { useContext, useState, useEffect } from 'react';
import MenuScreen from './MenuScreen';
import { ReactComponent as NomiTopBottomLogo } from 'components/nomi-topbottom.svg';
import styled from 'styled-components';
import MenuTabNav from '../components/MenuTabNav';
import RestaurantContext from '../../RestaurantContext';
import { getRestaurantLogo } from '../../utils'

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
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

export default () => {

  const context = useContext(RestaurantContext);
  const restaurant = context.restaurant;

  const [restaurantLogo, setRestaurantLogo] = useState();

  useEffect(() => {
    if(context.restaurant) {
      getRestaurantLogo(context.restaurant.id).then((logo) => {
        setRestaurantLogo(logo)
      })
    }
    
  }, [context.restaurant])

  return (
    <>
      <Header>
        <HeaderColumns style={{ width: '20%' }}>
          {
            restaurant ?
            <RestaurantImgLogo
              alt={`${restaurant.name} logo`}
              src={ restaurantLogo }
            /> : <></>
          }
        </HeaderColumns>
        <HeaderColumns style={{ width: '60%' }}>
          <MenuTabNav />
        </HeaderColumns>
        <HeaderColumns style={{ width: '20%' }}>
          <NomiLogo
            width='70px'
            height='28px'
          />
        </HeaderColumns>
      </Header>
      {context.menu?
        <MenuScreen
          restaurantName={restaurant.name}
          menu={context.menu}
        />
        :
        (
          context.error ?
          <PageError>There was an error loading this page. Please try reloading the page or contact the Nomi team by filling out a form at dinewithnomi.com</PageError> :
          <Loading>Restaurant Menu Loading...</Loading>
        )
      }
    </>
  );
}
