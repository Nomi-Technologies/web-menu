import React, { useEffect, useState, useLayoutEffect } from 'react';
import MenuCategoryPanel from '../components/MenuCategoryPanel';
import FilterSlideUpPanel from '../components/FilterSlideUpPanel';
import Banner from 'components/Banner';
import { Modal } from 'react-bootstrap';
import { ReactComponent as NomiLogo } from 'components/nomi-withword.svg';
import styled from 'styled-components';
import { filterMenu } from "../../utils"

const CategoryTab = styled.div`
  display: inline-block;
  margin: 0 15px;
  color: ${({ active }) => active ? 'black': '#B9B9B9'};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const BlueDot = styled.div`
  height: 4px;
  width: 4px;
  border-radius: 2px;
  background-color: #5383EC;
  margin: 0 auto;
  margin-top: 7px;
`;

const CategoryTabList = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 20px 5px 0 5px;
  overflow: auto;
  white-space: nowrap;
  position: sticky;
  background-color: #F8F8F8;
  z-index: 10;
  height: 58px;
`;

const MenuBody = styled.div`
  width: 100%;
  display: block;
  position: absolute;
  /* 50px for header; 80px for expansion strip + 70px for nomi logo */
  padding: 0 0 150px 0;
  margin-top: 58px;
  top: 0;
  bottom: 0;
  overflow: auto;
`;

const StyledBanner = styled(Banner)`
  height: 325px;
`;

const BannerContent = styled.div`
  z-index: 20;
  text-align: center;
  letter-spacing: 0.02em;
`;

const RestaurantName = styled.div`
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  color: #ffffff;
`;

const MenuName = styled.div`
  margin-top: 14px;
  background: #FFFFFF;
  border-radius: 6px;
  padding: 13px;
  display: inline-block;
  font-weight: normal;
  font-size: 14px;
  color: #628DEB;
  cursor: pointer;
`;

function MenuTabView(props) {

  const [categoryToRef, setCategoryToRef] = useState({});
  const [containerRef, setContainerRef] = useState();
  const [activeCategoryId, setActiveCategoryId] = useState();
  const [scrolling, setScrolling] = useState(false);
  
  // Must be triggered before render
  useLayoutEffect(() => {
    const newCategoryToRef = {};
    props.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      newCategoryToRef[c.id] = categoryRef;
    });

    setContainerRef(React.createRef)
    setCategoryToRef(newCategoryToRef);
    setActiveCategoryId(props.menu.categories[0]?.id);
  }, [props.menu]);

  function onScroll() {
    // Find the largest non-positive offset from tab bar.
    let runningMax = Number.MIN_SAFE_INTEGER;
    let activeId = activeCategoryId;
    for (const id in categoryToRef) {
      const offset = categoryToRef[id].current.getBoundingClientRect().top - 118;
      // if at the bottom of the menu, set the last category as the active one
      if(containerRef.current.getBoundingClientRect().bottom - categoryToRef[id].current.getBoundingClientRect().bottom == 150) {
        activeId = id;
        continue;
      }

      if (offset > 0) { continue; }
      if (runningMax < offset) {
        runningMax = runningMax;
        activeId = id;
      }
    }
    setActiveCategoryId(activeId);
  }

  function onSelectTab(id) {
    if(!scrolling) {
      setScrolling(true)
      categoryToRef[id].current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(_ => {setScrolling(false)}, 1500)
    }
  }

  return (
    <>
      <CategoryTabList>
        {props.menu.categories.map(c => {
          const active = c.id === activeCategoryId;
          return <CategoryTab
            key={c.id}
            active={active}
            onClick={() => onSelectTab(c.id)}
          >
            {c.name}
            {active ? <BlueDot /> : <></>}
          </CategoryTab>;
        })}
      </CategoryTabList>
      <MenuBody onScroll={onScroll} ref={ containerRef }>
        <StyledBanner>
          <BannerContent>
            <RestaurantName>{ props.restaurantName }</RestaurantName>
            <MenuName
              onClick={props.openSideNav}
            >{`${props.menuName} menu`}</MenuName>
          </BannerContent>
        </StyledBanner>
        {
          props.menu.categories.map(c => {
            const dishes = props.getDishByCategoryIdWithFilter(c.id);
            return (
              <MenuCategoryPanel key={c.id} dishes={dishes} category={c} categoryRef={categoryToRef[c.id]} menuHasAllergens={ props.menu.hasAllergens }/>
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

export default (props) => {

  const [selected, setSelected] = useState(new Set());
  const [excludedDishes, setExcludedDishes] = useState(new Set());
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  

  function onPanelExpansionChanged(expanded) {
    setPanelExpanded(expanded);
  }

  function onApplyFilter(selected) {    
    let excluded = filterMenu(props.menu.tags, props.menu.dishesByTags, selected)

    setSelected(selected);
    setExcludedDishes(excluded);
    setTimeout(() => setModalShow(false), 1000);
  }

  function onClearFilter() {
    setSelected(new Set());
    setExcludedDishes(new Set());
  }

  function getDishByCategoryIdWithFilter(categoryId) {
    const originalDishes = props.menu.dishesByCategory[categoryId];
    let filtered = [];
    originalDishes.forEach(d => {
      if (!excludedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  return (
    <MenuScreen {...props}>
      <MenuTabView
        menuName={props.menuName}
        restaurantName={props.restaurantName}
        openSideNav={props.openSideNav}
        menu={props.menu}
        getDishByCategoryIdWithFilter={getDishByCategoryIdWithFilter}
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
      { 
        // hide filtering menu if menu doesn't have allergens
        props.menu.hasAllergens ? 
        <SlideUpPanelWrapper>
          <FilterSlideUpPanel
            tags={props.menu.tags}
            expanded={panelExpanded}
            onExpansionChanged={onPanelExpansionChanged}
            onApplyFilter={onApplyFilter}
            onClearFilter={onClearFilter}
          />
        </SlideUpPanelWrapper>
        : ""
      }

      <Modal
        className='react-bootstrap-modal'
        show={modalShow}
        aria-labelledby="contained-modal-vcenter"
        centered
        backdrop={false}
      >
        <ApplyFilterModalBody>
          <ActiveFilterCount>{selected.size}</ActiveFilterCount>
          { selected.size > 1 ? "Filters Applied" : "Filter Applied" }
        </ApplyFilterModalBody>
      </Modal>
    </MenuScreen>
  );
}
