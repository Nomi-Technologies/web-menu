import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import HamburgerMenu from 'react-hamburger-menu';
import MenuListNav from 'components/MenuListNav';
import { getMenus, getDishesOfMenu, parseMenu } from 'utils';

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
  text-align: center;
`;

const RestaurantLogo = styled.a`
  margin: 5px auto;
  display: inline-block;

  & svg {
    height: 50px;
  }
`;

const HamburgerIcon = styled(HamburgerMenu)`
  position: absolute !important;
  top: 0%; left: 20px; bottom: 0;
  margin: auto 0;
  z-index: 20;
`;


export default class extends React.Component {

  state = {
    hamburgerOpen: false,
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
      });
  }

  onClickHambergerMenu() {
    this.setState({ hamburgerOpen: !this.state.hamburgerOpen });
  }

  onSelectMenu(index) {
    this.setState({ selectedMenuIndex: index });
  }

  render () {

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
          <RestaurantLogo href='https://www.bacariwadams.com/'>
            <ReactSVG 
              wrapper='span'
              src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/restaurant_logos/bacari.svg`}
              />
          </RestaurantLogo>
        </Header>
        <MenuListNav
          open={this.state.hamburgerOpen}
          menus={this.state.menus}
          selectedIndex={this.state.selectedMenuIndex}
          onSelectMenu={this.onSelectMenu.bind(this)}
        />
        {this.state.dishesByMenu.length > 0 ?
          <MenuScreen
            onClick={() => this.setState({ hamburgerOpen: false })}
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