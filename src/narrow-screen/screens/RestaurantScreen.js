import React, { useState, useContext, useEffect } from "react";
import RestaurantContext from '../../restaurant-context';
import MenuScreen from "./MenuScreen";
import styled from "styled-components";
import MenuListNav from "components/MenuListNav";
import { Button } from 'react-bootstrap';
import { getRestaurantLogo } from '../../utils'

const RestaurantScreen = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  background-color: #d8e2f8;
`;

const Header = styled.div`
  position: relative;
  flex: 0 0 auto;
  background-color: white;
  height: 60px; /* LOGO's 50px + 5px*2 */
  padding: 5px 0;
  display: flex;
  justify-content: center;
`;

const RestaurantLogo = styled.a`
  padding-top: 5px;
  & img {
    height: 35px;
  }
`;

const AllMenusButton = styled(Button)`
  position: absolute !important;
  top: 0%;
  left: 5px;
  bottom: 0;
  margin: auto 0;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #628deb;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const PageError = styled.div`
  position: relative;
  flex: 0 0 auto;
  text-align: center;
  color: #ff726f;
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

export default () => {
  const context = useContext(RestaurantContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [restaurantLogo, setRestaurantLogo] = useState();

  useEffect(() => {
    if(context.restaurant) {
      getRestaurantLogo(context.restaurant.id).then((logo) => {
        setRestaurantLogo(logo)
      })
    }
    
  }, [context.restaurant])

  function onClickHambergerMenu() {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <RestaurantScreen>
      <Header>
        <AllMenusButton
          variant="link"
          onClick={onClickHambergerMenu}
        >
          SEE MENUS
        </AllMenusButton>
        {
          context.restaurant ?
          <RestaurantLogo href={ context.restaurant.logo }>
            <img
              alt={`${context.restaurant.name} logo`}
              src={ restaurantLogo }
            />
          </RestaurantLogo> : <></>
        }
      </Header>
      <MenuListNav
        onClose={() => setHamburgerOpen(false)}
        open={hamburgerOpen} 
      />
      {context.menu ? (
        <MenuScreen
          openSideNav={() => setHamburgerOpen(true)}
        />
      ) : context.error ? (
        <PageError>
          There was an error loading this page. Please try reloading the page
          or contact the Nomi team by filling out a form at dinewithnomi.com
        </PageError>
      ) : (
        <Loading>Restaurant Menu Loading...</Loading>
      )}
    </RestaurantScreen>
  );
}
