import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HamburgerMenu from 'react-hamburger-menu';
import MenuList from '../components/MenuList';
import FilterSlideUpPanel from '../components/FilterSlideUpPanel';
import { Modal } from 'react-bootstrap';
import { ReactComponent as NomiLogo } from '../../components/nomi-withword.svg';
import { ReactComponent as NomiTopBottomLogo } from '../../components/nomi-topbottom.svg';
import RestaurantLogo from '../../components/bacari-logo.png';
import './MenuScreen.css';

const { apiBaseUrl } = require('../../config');

export default class MenuScreen extends React.Component {

  state = {
    error: null,
    menu: null,
    tabIndex: 0,
    selected: new Set(),
    excludedDishes: new Set(),
    panelExpanded: false,
    hamburgerOpen: false,
  };

  handleClick() {
  	this.setState({
  		hamburgerOpen: !this.state.hamburgerOpen
  	});
  }

  componentDidMount() {
    fetch(`${apiBaseUrl[process.env.NODE_ENV]}/webApi/dishes/1`)
      .then(res => res.json())
      .then(data => {
        const menu = this.parseMenu(data);
        this.setState({
          menu: menu,
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  parseMenu(data) {

    let menu = {
      categories: [],
      dishes: [],
      dishesByCategory: {},
      dishesByTags: {},
      tags: {},
    };

    data.forEach(dish => {
      menu.dishes[dish.id] = dish;
      if (!menu.categories.includes(dish.category.name)) {
        menu.categories.push(dish.category.name);
        menu.dishesByCategory[dish.category.name] = [];
      }
      menu.dishesByCategory[dish.category.name].push(dish);
      dish.tags.forEach(tag => {
        if (!(tag.id in menu.tags)) {
          menu.tags[tag.id] = tag;
          menu.dishesByTags[tag.id] = [];
        }
        menu.dishesByTags[tag.id].push(dish);
      });
    });
    console.log(menu);
    return menu;
  }

  onSelect(index, lastIndex) {
    if (lastIndex === index) {
      return;
    }
    this.setState({ tabIndex: index });
  }

  onPanelExpansionChanged(expanded) {
    console.log(expanded);
    this.setState({ panelExpanded: expanded });
  }

  onApplyFilter(selected) {
    let excluded = new Set();
    selected.forEach(t =>
      this.state.menu.dishesByTags[t].forEach(d => excluded.add(d.id))
    );
    this.setState({
      selected: selected,
      excludedDishes: excluded,
      panelExpanded: false,
    });
    setTimeout(() => this.setState({ modalShow: false }), 1000);
  }

  onClearFilter() {
    console.log(this.state.panelExpanded);
    this.setState({
      selected: new Set(),
      excludedDishes: new Set(),
    });
  }

  getDishByCategoryWithFilter(category) {
    const originalDishes = this.state.menu.dishesByCategory[category];
    let filtered = [];
    originalDishes.forEach(d => {
      if (!this.state.excludedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  render() {
    const menu = this.state.menu;
    if (menu) {
      return (
        <div className='menu-screen-wrapper-web'>
          <div className="web-header">
            <HamburgerMenu className="hamburger-icon"
              isOpen={this.state.hamburgerOpen}
              menuClicked={this.handleClick.bind(this)}
              width={30}
              height={25}
              strokeWidth={2}
              rotate={0}
              color='black'
              borderRadius={5}
              animationDuration={0.3}
              />
                <NomiTopBottomLogo
                width='70px'
                height='28px'
                className='nomi-logo-top-bar'
              />
              <img src={RestaurantLogo} className='restaurant-logo' />
              <div className="filter-words">Display Filtered Dishes</div>
              <div className="filter-toggle">
                <div className="filter-toggle-button"></div>
              </div>
          </div>
          <div className="web-main-content">
            <div className="web-banner">
              <div className='restaurant-title'>
              {this.props.restaurantId.toUpperCase()}
              </div>
            </div>
            <div className='web-list-content'>
              {menu.categories.map(c => {
                const dishes = this.getDishByCategoryWithFilter(c);
                return <MenuList dishes={dishes} category={c}/>
              })}
            </div>
            <div className='nomi-logo-bar-web'>
              <div className='nomi-logo-txt'>Powered by</div>
              <a href='https://www.dinewithnomi.com/'>
                <NomiLogo
                  width='70px'
                  height='16px'
                  className='nomi-logo'
                  fill='#8A9DB7'
                />
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.error) {
        return <div>{this.state.error}</div>;
      } else {
        return <div>Loading...</div>;
      }
    }

  }
}
