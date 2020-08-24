import React from 'react';
import MenuScreen from './MenuScreen';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import MenuListNav from 'components/MenuListNav';
import { Button } from 'react-bootstrap';

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
  height: 60px; /* LOGO's 50px + 5px*2 */
  padding: 5px 0;
`;

const RestaurantLogo = styled.a`
  position: absolute;
  display: inline-block;
  right: 30px;
  & svg {
    height: 50px;
  }
`;

const AllMenusButton = styled(Button)`
  position: absolute !important;
  top: 0%; left: 20px; bottom: 0;
  margin: auto 0;
  z-index: 20;
  font-weight: bold;
  color: #628DEB;

  text-decoration: none;
  &:hover, &:focus {
    text-decoration: none;
  }
`;


export default class extends React.Component {

  state = {
    hamburgerOpen: false,
  };

  onClickHambergerMenu() {
    this.setState({ hamburgerOpen: !this.state.hamburgerOpen });
  }

  render () {

    return (
      <RestaurantScreen>
        <Header>
          <AllMenusButton
            variant='link'
            onClick={this.onClickHambergerMenu.bind(this)}
          >
            ALL MENUS
          </AllMenusButton>
          <RestaurantLogo href='https://www.bacariwadams.com/'>
            <ReactSVG 
              wrapper='span'
              src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/restaurant_logos/bacari.svg`}
              />
          </RestaurantLogo>
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
            this.props.error ? 
            <div>Some error has ocurred. Please try reloading the page.</div> :
            <div>Loading...</div>
          )
        }
      </RestaurantScreen>
  );
  }
}