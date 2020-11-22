import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import MenuCategoryPanel from '../components/MenuCategoryPanel';
import FilterSlideUpPanel from '../components/FilterSlideUpPanel';
import Banner from 'components/Banner';
import { ReactComponent as NomiLogo } from 'components/nomi-withword.svg';
import styled from 'styled-components';
import RestaurantContext from '../../RestaurantContext'
import { getMenuBannerImage } from 'utils';
import RemovableNotice from 'components/RemovableNotice';

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

function MenuTabView({ openSideNav }) {

  const context = useContext(RestaurantContext);
  const [categoryToRef, setCategoryToRef] = useState({});
  const [containerRef, setContainerRef] = useState();
  const [activeCategoryId, setActiveCategoryId] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [menuBanner, setMenuBanner] = useState();

  useEffect(() => {
    if(context.restaurant && context.selectedMenuIndex !== null) {
      getMenuBannerImage(context.restaurant.Menus[context.selectedMenuIndex].id).then((banner) => {
        setMenuBanner(banner)
      })
    }
  }, [context.restaurant, context.selectedMenuIndex])

  function getDishByCategoryIdWithFilter(categoryId) {
    const originalDishes = context.menu.dishesByCategory[categoryId];
    let filtered = [];
    originalDishes.forEach(d => {
      if (!context.excludedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }
  
  // Must be triggered before render
  useLayoutEffect(() => {
    const newCategoryToRef = {};
    context.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      newCategoryToRef[c.id] = categoryRef;
    });

    setContainerRef(React.createRef)
    setCategoryToRef(newCategoryToRef);
    setActiveCategoryId(context.menu.categories[0]?.id);
  }, [context.menu]);

  function onScroll() {
    // Find the largest non-positive offset from tab bar.
    let runningMax = Number.MIN_SAFE_INTEGER;
    let activeId = activeCategoryId;
    for (const id in categoryToRef) {
      const offset = categoryToRef[id].current.getBoundingClientRect().top - 118;
      // if at the bottom of the menu, set the last category as the active one
      if(containerRef.current.getBoundingClientRect().bottom - categoryToRef[id].current.getBoundingClientRect().bottom === 150) {
        activeId = id;
        continue;
      }

      if (offset > 0) { continue; }
      if (runningMax < offset) {
        runningMax = offset;
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
        {context.menu.categories.map(c => {
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
        <StyledBanner src={ menuBanner }>
          <BannerContent>
            <RestaurantName>{ context.restaurant.name }</RestaurantName>
            <MenuName
              onClick={openSideNav}
            >{`${context.restaurant.Menus[context.selectedMenuIndex].name} menu`}</MenuName>
          </BannerContent>
        </StyledBanner>
        {
          context.menu.hasRemovables ?
          <RemovableNotice /> : null
        }
        {
          context.menu.categories.map(c => {
            const dishes = getDishByCategoryIdWithFilter(c.id);
            return (
              <MenuCategoryPanel key={c.id} dishes={dishes} category={c} categoryRef={categoryToRef[c.id]} menuHasAllergens={ context.menu.hasAllergens }/>
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

export default (props) => {

  const context = useContext(RestaurantContext);

  return (
    <MenuScreen>
      <MenuTabView
        openSideNav={props.openSideNav}
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
      {/* { 
        // hide filtering menu if menu doesn't have allergens
        context.menu.hasAllergens ? 
        <SlideUpPanelWrapper>
          <FilterSlideUpPanel />
        </SlideUpPanelWrapper>
        : ""
      } */}
    </MenuScreen>
  );
}
