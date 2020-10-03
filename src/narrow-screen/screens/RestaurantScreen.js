import React from "react";
import MenuScreen from "./MenuScreen";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import MenuListNav from "components/MenuListNav";
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
  height: 60px; /* LOGO's 50px + 5px*2 */
  padding: 5px 0;
  display: flex;
  justify-content: center;
`;

const RestaurantLogo = styled.a`
  padding-top: 5px;
  & svg {
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

export default class extends React.Component {
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
            variant="link"
            onClick={this.onClickHambergerMenu.bind(this)}
          >
            SEE MENUS
          </AllMenusButton>
          <RestaurantLogo href="https://www.bacariwadams.com/">
            <ReactSVG
              wrapper="div"
              src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/restaurant_logos/bacari.svg`}
            />
          </RestaurantLogo>
        </Header>
        <MenuListNav
          onClose={() => this.setState({ hamburgerOpen: false })}
          open={this.state.hamburgerOpen} 
          {...this.props}
        />
        {this.props.dishesByMenu.length > 0 ? (
          <MenuScreen
            openSideNav={() => this.setState({ hamburgerOpen: true })}
            restaurantName={this.props.restaurantName}
            menu={this.props.dishesByMenu[this.props.selectedMenuIndex]}
            menuName={this.props.menus[this.props.selectedMenuIndex].name}
          />
        ) : this.props.error ? (
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
}
