import React from 'react';
import MobileRestaurantScreen from 'narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from 'wide-screen/screens/RestaurantScreen';
import { withRouter } from 'react-router-dom';
import { withUserAgent } from 'react-useragent';
import { getMenus, getDishesOfMenu, parseMenu } from 'utils';

class RestaurantMenuScreen extends React.Component {

  constructor(props) {
    super(props);
    this.restaurantIdentifier = this.props.match.params.restaurant_identifier;
  }

  state = {
    menus: [],
    selectedMenuIndex: 0,
    dishesByMenu: [],
    error: null,
  };
  
  componentDidMount() {
    getMenus(this.restaurantIdentifier)
      .then(menus => {
        this.setState({ menus: menus });
        Promise.all(menus.map(async menu => {
          let rawMenu = await getDishesOfMenu(this.restaurantIdentifier, menu.id);
          return parseMenu(rawMenu);
        }))
          .then(dishesByMenu => this.setState({ dishesByMenu: dishesByMenu }));
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  onSelectMenu(index) {
    this.setState({ selectedMenuIndex: index });
  }

  render() {
    if (window.innerWidth < 760) {
      return <MobileRestaurantScreen
        {...this.state}
        onSelectMenu={this.onSelectMenu.bind(this)}
        restaurantId={this.restaurantIdentifier}
      />;
    } else {
      return <WebRestuarantScreen
        {...this.state}
        onSelectMenu={this.onSelectMenu.bind(this)}
        restaurantId={this.restaurantIdentifier}
      />;
    }
  }
}

export default withRouter(withUserAgent(RestaurantMenuScreen));
