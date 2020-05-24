import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuCategoryPanel from '../components/MenuCategoryPanel';
import FilterSlideUpPanel from '../components/FilterSlideUpPanel';
import '../index.css';

const { apiBaseUrl } = require('../config');

class MenuScreen extends React.Component {

  state = {
    error: null,
    menu: null,
    tabIndex: 0,
    excludedDishes: new Set(),
    panelExpanded: false,
  };

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
    // *********************** menu **************************
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
    return menu;
  }

  onSelect(index, lastIndex) {
    if (lastIndex === index) {
      return;
    }
    this.setState({ tabIndex: index });
  }

  onPanelExpansionChanged(expanded) {
    this.setState({ panelExpanded: expanded });
  }

  onApplyFilter(selected, expanded) {
    let excluded = new Set();
    selected.forEach(t => 
      this.state.menu.dishesByTags[t].forEach(d => excluded.add(d))
    );
    this.setState({
      excludedDishes: excluded,
      panelExpanded: expanded
    });
  }

  getDishByCategoryWithFilter(category) {
    const originalDishes = this.state.menu.dishesByCategory[category];
    let filtered = [];
    originalDishes.forEach(d => {
      if (!this.state.excludedDishes.has(d.name)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  render() {
    const menu = this.state.menu;
    if (menu) {
      return (
        <div className='menu-screen-wrapper'>
          <Tabs
            selectedIndex={this.state.tabIndex}
            forceRenderTabPanel={true}
            onSelect={this.onSelect.bind(this)}
            selectedTabClassName='menu-tab-selected'
            selectedTabPanelClassName='menu-panel-selected'
          >
            <TabList className='menu-tabs'>
              {menu.categories.map(c =>
                <Tab className='menu-tab' key={c}>{c}</Tab>
              )}
            </TabList>
            {menu.categories.map(c => {
              const dishes = this.getDishByCategoryWithFilter(c);
              return <TabPanel key={c} className='menu-panel'>
                <MenuCategoryPanel dishes={dishes}/>
              </TabPanel>
            })}
          </Tabs>
          <div className='slide-up-panel-wrapper'>
            <FilterSlideUpPanel
              tags={menu.tags}
              expanded={this.state.panelExpanded}
              onExpansionChanged={this.onPanelExpansionChanged.bind(this)}
              onApplyFilter={this.onApplyFilter.bind(this)}
            />
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

export default MenuScreen;