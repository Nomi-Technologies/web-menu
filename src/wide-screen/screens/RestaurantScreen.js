import React from 'react';
import MenuScreen from './MenuScreen';
import HamburgerMenu from 'react-hamburger-menu';
import RestaurantLogo from 'components/bacari-logo.png';
import { ReactComponent as NomiTopBottomLogo } from 'components/nomi-topbottom.svg';
import styled from 'styled-components';
import { getMenus, getDishesOfMenu, parseMenu } from 'utils';
import { Button } from 'react-bootstrap';

const SideNav = styled.div`
  padding: 80px 40px;
  background: #F2F3F5;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100%;
  z-index: 16;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`

const MenuTile = styled(Button)`
  height: 35px;
  display: block;
  width: 100%;
  font-weight: bold;
  margin-bottom: 20px;
`;

function MenuListSideNav(props) {
  return (
    <SideNav open={props.hamburgerOpen}>
      {props.menus.map((menu, i) =>
        <MenuTile
          key={menu.id}
          variant={props.selectedMenuIndex === i ? 'info': 'outline-info'}
          onClick={() => props.onSelectMenu(i)}
        >
          {menu.name}
        </MenuTile>)}
    </SideNav>
  )
}

const RestaurantScreen = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  background-color: #d8e2f8;
`;

const Header = styled.div`
  flex: 0 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  /* White */
  background: #FFFFFF;
  /* card-shadow-3 */
  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
`;

const HamburgerIcon = styled(HamburgerMenu)`
  position: relative;
  margin-left: 1%;
  z-index: 20;
  display: block;
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
    hamburgerOpen: true,
    menus: [],
    selectedMenuIndex: 0,
    dishesByMenu: [],
    error: null,
  };

  componentDidMount() {
    getMenus(this.props.restaurantId)
      .then(menus => {
        this.setState({ menus: menus });
        Promise.all(menus.map(async menu => {
          let rawMenu = await getDishesOfMenu(this.props.restaurantId, menu.id);
          return parseMenu(rawMenu);
        }))
          .then(dishesByMenu => this.setState({ dishesByMenu: dishesByMenu }));
      })
      .catch(err => {
        this.setState({ error: err });
      })
  }

  onClickHambergerMenu() {
    this.setState({ hamburgerOpen: !this.state.hamburgerOpen });
  }

  onSelectMenu(index) {
    this.setState({ selectedMenuIndex: index });
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
        <MenuListSideNav 
          {...this.state}
          onSelectMenu={this.onSelectMenu.bind(this)}
        />
        {this.state.dishesByMenu.length > 0 ?
          <MenuScreen
            restaurantName={this.props.restaurantId}
            menu={this.state.dishesByMenu[this.state.selectedMenuIndex]}
          />
          : 
          (
            this.state.error ? 
            <div>Some error has ocurred. Please try reloading the page.</div> :
            <div>Loading...</div>
          )
        }
      </RestaurantScreen>
    );
  }
}
