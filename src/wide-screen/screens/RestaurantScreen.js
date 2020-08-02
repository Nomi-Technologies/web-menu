import React from 'react';
import MenuScreen from './MenuScreen';
import HamburgerMenu from 'react-hamburger-menu';
import RestaurantLogo from '../../components/bacari-logo.png';
import { ReactComponent as NomiTopBottomLogo } from '../../components/nomi-topbottom.svg';
import styled from 'styled-components';

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
  z-index: 15;
  display: flex;
  align-items: center;
  /* White */
  background: #FFFFFF;
  /* card-shadow-3 */
  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
`;

const HamburgerIcon = styled(HamburgerMenu)`
  margin-left: 1%;
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
          <HamburgerIcon
            isOpen={this.state.hamburgerOpen}
            menuClicked={this.onClickHambergerMenu.bind(this)}
            width={30}
            height={25}
            strokeWidth={2}
            rotate={0}
            color='black'
            borderRadius={5}
            animationDuration={0.3}
          />
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
        <MenuScreen restaurantId={this.props.restaurantId}/>
      </RestaurantScreen>
    );
  }
}
