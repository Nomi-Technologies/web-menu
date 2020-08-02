import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuList from '../components/MenuList';
import HotScrollSidePanel from '../components/HotScrollSidePanel';
import AllergenFiltersSidePanel from '../components/AllergenFiltersSidePanel';
// import { Modal } from 'react-bootstrap';
import { ReactComponent as NomiLogo } from '../../components/nomi-withword.svg';
import styled from 'styled-components';
import BannerImage from '../../components/web_menu_banner.jpg';

const CommonTopPadding = styled.div`
  padding-top: 20px;
`;

const LeftPanelWrapper = styled(CommonTopPadding)`
  height: 100%;
  width: 20%;
  padding: auto 16px;
  overflow: scroll;
`;

function LeftPanel(props) {
  return (
    <LeftPanelWrapper>
      <HotScrollSidePanel
        categories={props.menu.categories}
        categoryToRef={props.categoryToRef}
        expanded={props.hotScrollPanelExpanded}
        onExpansionChanged={props.onHotScrollPanelExpansionChanged}
      />
      <AllergenFiltersSidePanel
        tags={props.menu.tags}
        expanded={props.allergenFiltersPanelExpanded}
        onExpansionChanged={props.onAllergenFiltersPanelExpansionChanged}
        onApplyFilter={props.onApplyFilter}
        onClearFilter={props.onClearFilter}
      />
    </LeftPanelWrapper>
  );
}

const RightPanelWrapper = styled.div`
  width: 20%;
`;

function RightPanel(props) {
  return (
    <RightPanelWrapper>

    </RightPanelWrapper>
  )
}

const MainContentWrapper = styled(CommonTopPadding)`
  width: 60%;
  height: 100%;
  overflow: scroll;
`;

const Banner = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
  top: 0px;
  margin: 0 16px 0px 16px;
  background: url(${BannerImage});
  background-size: cover;
  background-color: none;
  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
  z-index: 10;
  border-radius: 10px;
`;

const RestaurantName = styled.div`
  left: calc(50% - 321px/2 + 1px);
  top: calc(50% - 43px/2 + 1px);

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  text-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
`;

const DishList = styled.div`
  margin-bottom: 20px;
`;

const NomiBottomLogo = styled.div`
  height: 22px;
  display: block;
  bottom: 105px; /* 25px from the bottom slide up panel */
  left: 0;
  right: 0;
  text-align: center;
  color: #C4CEDB;
  font-weight: 500;
  z-index: 0;
  margin: 3%;
`;

const NomiBottomLogoText = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const NomiBottomLogoImage = styled.a`
  
  & svg {
    position: relative;
    bottom: 4px;
    display: inline-block;
    filter: invert(86%) sepia(55%) saturate(2144%) hue-rotate(177deg) brightness(78%) contrast(78%);
  }
`;

function MainContent(props) {
  return (
    <MainContentWrapper>
      <Banner>
        <RestaurantName>{props.restaruantName}</RestaurantName>
      </Banner>
      <DishList>
        {props.menu.categories.map((c, i) => {
          const dishes = props.getDishByCategoryWithFilter(c);
          return <MenuList reactRef={props.categoryToRef[c]} dishes={dishes} category={c} key={i} />;
        })}
      </DishList>
      <NomiBottomLogo>
        <NomiBottomLogoText>Powered by</NomiBottomLogoText>
        <NomiBottomLogoImage 
          href='https://www.dinewithnomi.com/'
        >
          <NomiLogo
            width='70px'
            height='16px'
            fill='#8A9DB7'
          />
        </NomiBottomLogoImage>
      </NomiBottomLogo>
    </MainContentWrapper>
  );
}

const MenuScreen = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: row;
  flex: 1 1 auto;
  overflow: hidden;
`;

export default class extends React.Component {

  state = {
    error: null,
    menu: null,
    tabIndex: 0,
    selected: new Set(),
    excludedDishes: new Set(),
    hotScrollPanelExpanded: false,
    allergenFiltersPanelExpanded: false,
    categoryToRef: {},
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/webApi/dishes/${this.props.restaurantId}`)
      .then(res => res.json())
      .then(data => {
        const menu = this.parseMenu(data);
        let categoryToRef = {};

        menu.categories.forEach(c => {
          const categoryRef = React.createRef();
          categoryToRef[c] = categoryRef;
        });

        this.setState({
          categoryToRef: categoryToRef,
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

    return menu;
  }

  onSelect(index, lastIndex) {
    if (lastIndex === index) {
      return;
    }
    this.setState({ tabIndex: index });
  }

  onHotScrollPanelExpansionChanged(expanded) {
    this.setState({ hotScrollPanelExpanded: expanded });
  }

  onAllergenFiltersPanelExpansionChanged(expanded) {
    this.setState({ allergenFiltersPanelExpanded: expanded });
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

  // TODO(tony): use restaurant name instead of slug field
  render() {
    const menu = this.state.menu;
    if (menu) {
      return (
        <MenuScreen>
          <LeftPanel
            {...this.state}
            onHotScrollPanelExpansionChanged={this.onHotScrollPanelExpansionChanged.bind(this)}
            onAllergenFiltersPanelExpansionChanged={this.onAllergenFiltersPanelExpansionChanged.bind(this)}
            onApplyFilter={this.onApplyFilter.bind(this)}
            onClearFilter={this.onClearFilter.bind(this)}
          />
          <MainContent
            {...this.state}
            restaruantName={this.props.restaurantId.toUpperCase()}
            getDishByCategoryWithFilter={this.getDishByCategoryWithFilter.bind(this)}
          />
          <RightPanel/>
        </MenuScreen>
      );
    } else {
      if (this.state.error) {
        console.log(this.state.error);
        return <div>{this.state.error}</div>;
      } else {
        return <div>Loading...</div>;
      }
    }

  }
}
