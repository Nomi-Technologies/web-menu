import React from 'react';
import MenuScreen from './MenuScreen';
import RestaurantLogo from 'components/bacari-logo.png';
import { ReactComponent as NomiTopBottomLogo } from 'components/nomi-topbottom.svg';
import styled from 'styled-components';
import MenuListNav from 'components/MenuListNav';
import { Button } from 'react-bootstrap';

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

const AllMenusButton = styled(Button)`
  position: relative;
  margin-left: 20px;
  z-index: 20;
  display: block;
  font-weight: bold;
  color: #628DEB;

  text-decoration: none;
  &:hover, &:focus {
    text-decoration: none;
  }
`;

const NomiLogo = styled(NomiTopBottomLogo)`
  position: relative;
  display: inline-block;
  margin-left: 2%;
  margin-right: 2%;
`;

const RestaurantImgLogo = styled.img`
  height: 28px;
  width: 84px;
  margin-left: 10%;
  margin-right: 10%;
`;

const FilterWords = styled.div`
  /* Display Filtered Dishes */
  left: 60.49%;
  right: 29.17%;
  top: 35%;
  bottom: 36.67%;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.02em;

  margin-left: 30%;
  height: 28px;

  color: #000000;
`;

const FilterToggle = styled.div`
  /* Rectangle 149 */
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  height: 20px;
  width: 40px;

  margin-left: 1%;

  background: #64C255;
  border-radius: 20px;

  display: flex;
  align-items: center;
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

export default class extends React.Component{

  state = {
    hamburgerOpen: false,
  };

  onClickHambergerMenu() {
    this.setState({ hamburgerOpen: !this.state.hamburgerOpen });
  }

  render() {
    return (
      <RestaurantScreen>
        <Header>
          <AllMenusButton
            variant='link'
            onClick={this.onClickHambergerMenu.bind(this)}
          >
            ALL MENUS
          </AllMenusButton>
          <NomiLogo
            width='70px'
            height='28px'
          />
          <RestaurantImgLogo src={RestaurantLogo} />
          <FilterWords>Display Filtered Dishes</FilterWords>
          <FilterToggle>
            <FilterToggleSwitch/>
          </FilterToggle>
        </Header>
        <MenuListNav
          open={this.state.hamburgerOpen}
          {...this.props}
        />
        {this.props.dishesByMenu.length > 0 ?
          <MenuScreen
            onClick={() => this.setState({ hamburgerOpen: false })}
            restaurantName={this.props.restaurantId}
            menu={this.props.dishesByMenu[this.props.selectedMenuIndex]}
          />
          :
          (
            this.state.error ?
            <PageError>There was an error loading this page. Please try reloading the page or contact the Nomi team by filling out a form at dinewithnomi.com</PageError> :
            <Loading>Restaurant Menu Loading...</Loading>
          )
        }
      </RestaurantScreen>
    );
  }
}
