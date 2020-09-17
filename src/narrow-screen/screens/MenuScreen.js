import React, { useEffect, useState } from 'react';
import MenuCategoryPanel from '../components/MenuCategoryPanel';
import FilterSlideUpPanel from '../components/FilterSlideUpPanel';
import Banner from 'components/Banner';
import { Modal } from 'react-bootstrap';
import { ReactComponent as NomiLogo } from 'components/nomi-withword.svg';
import styled from 'styled-components';

const CategoryTab = styled.div`
  height: 30px;
  display: inline-block;
  margin: 20px 15px 0 15px;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &.is-selected {
    color: black;
    padding-bottom: 6px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: solid 4px #5383EC;
  }
`;

const CategoryTabList = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0 5px;
  overflow: auto;
  white-space: nowrap;
  position: sticky;
  background-color: white;
  z-index: 10;
`;

const MenuBody = styled.div`
  width: 100%;
  display: block;
  position: absolute;
  /* 50px for header; 80px for expansion strip + 70px for nomi logo */
  padding: 0 0 150px 0;
  margin-top: 50px;
  top: 0;
  bottom: 0;
  overflow: auto;
`;

const StyledBanner = styled(Banner)`
  height: 325px;
`;

const RestaurantName = styled.div`
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #ffffff;
  z-index: 20;
`;

function MenuTabView(props) {

  const [categoryToRef, setCategoryToRef] = useState({});
  const [activeCategoryId, setActiveCategoryId] = useState();

  useEffect(() => {
    const newCategoryToRef = {};
    props.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      newCategoryToRef[c.id] = categoryRef;
    });
    setCategoryToRef(newCategoryToRef);
    setActiveCategoryId(props.menu.categories[0]?.id);
  }, [props.menu]);

  function onScroll() {
    // Find the largest non-positive offset from tab bar.
    let runningMax = Number.MIN_SAFE_INTEGER;
    let activeId = activeCategoryId;
    for (const id in categoryToRef) {
      const offset = categoryToRef[id].current.getBoundingClientRect().top - 110;
      if (offset > 0) { continue; }
      if (runningMax < offset) {
        runningMax = runningMax;
        activeId = id;
      }
    }
    setActiveCategoryId(activeId);
  }

  return (
    <>
      <CategoryTabList>
        {props.menu.categories.map(c =>
          <CategoryTab
            key={c.id}
            // == for string number comparison
            className={activeCategoryId == c.id ? 'is-selected': ''}
            onClick={() => categoryToRef[c.id].current.scrollIntoView() }
          >{c.name}</CategoryTab>
        )}
      </CategoryTabList>
      <MenuBody onScroll={onScroll}>
        <StyledBanner>
        </StyledBanner>
        {
          props.menu.categories.map(c => {
            const dishes = props.getDishByCategoryIdWithFilter(c.id);
            return (
              <MenuCategoryPanel dishes={dishes} category={c} categoryRef={categoryToRef[c.id]} />
            );
          })
        }
      </MenuBody>
    </>
  );
}

const MenuScreen = styled.div`
  position: relative;
  flex-flow: column;
  flex: 1 1 auto;
  background-color: transparent;
`;

const NomiLogoBar = styled.div`
  height: 22px;
  position: absolute;
  display: block;
  bottom: 105px; /* 25px from the bottom slide up panel */
  left: 0;
  right: 0;
  text-align: center;
  color: #C4CEDB;
  font-weight: 500;
  z-index: 0;
`;

const NomiLogoText = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const NomiLogoSVG = styled(NomiLogo)`
  position: relative;
  bottom: 4px;
  display: inline-block;
  filter: invert(86%) sepia(55%) saturate(2144%) hue-rotate(177deg) brightness(78%) contrast(78%);
`;

const SlideUpPanelWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ApplyFilterModalBody = styled.div`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  width: 265px;
  height: 120px;
  line-height: 120px;
  margin: 0 auto;
  background-color: #E3EDF2;
  border-radius: 10px;
  color: #5383EC;
`;

const ActiveFilterCount = styled.div`
  display: inline-block;
  height: 52px;
  width: 52px;
  line-height: 52px;
  border-radius: 26px;
  margin-right: 15px;
  color: white;
  font-weight: bold;
  background-color: #5383EC;
`;

export default class extends React.Component {

  state = {
    tabIndex: 0,
    selected: new Set(),
    excludedDishes: new Set(),
    panelExpanded: false,
    modalShow: false,
  };

  onSelectTab(index, lastIndex) {
    if (lastIndex === index) {
      return;
    }
    this.setState({ tabIndex: index });
  }

  onPanelExpansionChanged(expanded) {
    this.setState({ panelExpanded: expanded });
  }

  onApplyFilter(selected) {
    let excluded = new Set();
    selected.forEach(t =>
      this.props.menu.dishesByTags[t].forEach(d => excluded.add(d.id))
    );
    this.setState({
      selected: selected,
      excludedDishes: excluded,
      panelExpanded: false,
      modalShow: true
    });
    setTimeout(() => this.setState({ modalShow: false }), 1000);
  }

  onClearFilter() {
    this.setState({
      selected: new Set(),
      excludedDishes: new Set(),
    });
  }

  getDishByCategoryIdWithFilter(categoryId) {
    const originalDishes = this.props.menu.dishesByCategory[categoryId];
    let filtered = [];
    originalDishes.forEach(d => {
      if (!this.state.excludedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  render() {
    return (
      <MenuScreen {...this.props}>
        <MenuTabView
          {...this.state}
          menu={this.props.menu}
          onSelectTab={this.onSelectTab.bind(this)}
          getDishByCategoryIdWithFilter={this.getDishByCategoryIdWithFilter.bind(this)}
        />
        <NomiLogoBar>
          <NomiLogoText>Powered by</NomiLogoText>
          <a href='https://www.dinewithnomi.com/'>
            <NomiLogoSVG
              width='70px'
              height='16px'
              fill='#8A9DB7'
            />
          </a>
        </NomiLogoBar>
        <SlideUpPanelWrapper>
          <FilterSlideUpPanel
            tags={this.props.menu.tags}
            expanded={this.state.panelExpanded}
            onExpansionChanged={this.onPanelExpansionChanged.bind(this)}
            onApplyFilter={this.onApplyFilter.bind(this)}
            onClearFilter={this.onClearFilter.bind(this)}
          />
        </SlideUpPanelWrapper>
        <Modal
          className='react-bootstrap-modal'
          show={this.state.modalShow}
          aria-labelledby="contained-modal-vcenter"
          centered
          backdrop={false}
        >
          <ApplyFilterModalBody>
            <ActiveFilterCount>{this.state.selected.size}</ActiveFilterCount>
            Filters Applied
          </ApplyFilterModalBody>
        </Modal>
      </MenuScreen>
    );
  }
}
