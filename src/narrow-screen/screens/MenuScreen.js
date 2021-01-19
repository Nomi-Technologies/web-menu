import React, { useState, useLayoutEffect, useContext, useEffect, useRef } from 'react';
import MenuCategoryPanel from '../components/MenuCategoryPanel';
import FilterSidePanel from '../components/FilterSidePanel';
import Banner from 'components/Banner';
import { ReactComponent as NomiLogo } from 'components/nomi-withword.svg';
import styled from 'styled-components';
import MenuListNav from "../components/MenuListNav";
import { getRestaurantLogo } from 'utils'
import { Button } from 'react-bootstrap';
import RestaurantContext from 'RestaurantContext'
import { getMenuBannerImage } from 'utils';
import RemovableNotice from 'components/RemovableNotice';
import Counter from '../../components/Counter';

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
  margin-top: 60px;
  padding: 20px 5px 0 5px;
  overflow: auto;
  white-space: nowrap;
  background-color: #F8F8F8;
  z-index: 100;
  width: 100%;
  height: 58px;
`;

const MenuBody = styled.div`
  width: 100%;
  display: block;
  /* 50px for header; 80px for expansion strip + 70px for nomi logo */
  padding: 0 0 150px 0;
  margin-top: 118px; /* 58px + 60px */
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

const MenuScreen = styled.div`
  position: relative;
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

const Header = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
`;

//Notification flashes for 4 second when 1+ filter is applied  
const NotificationBanner = styled.div`
  background-color: #628DEB;
  height: 60px; /* LOGO's 50px + 5px*2 */
  padding: 5px 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: center;

  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 50px; 
  color:white;

  animation: FadeAnimation 4s ease-in forwards; /*using forwards retains the last keyframe*/
  @keyframes FadeAnimation {
    0% {
      opacity: 0;
    }
    30%{
      opacity: 1;
      z-index: 2; /*temporarily cover restaurant logo*/
    }
    100% {
      opacity: 0;
    }
  }
`;

const RestaurantLogo = styled.a`
  position: absolute;
  top: 0px;
  left: 30%;
  line-height: 50px;
  & img {
    height: 35px;
  }
`;

const AllMenusButton = styled(Button)`
  position: absolute;
  top: 0px;
  padding-top: 60px;
  transform: translate(0, -50%);
  left: 5px;
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

const FilteringButton = styled.div`
  position: absolute;
  top: 0px;
  padding-top: 60px;
  transform: translate(0, -50%);
  right: 1px;
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

export default () => {
  const context = useContext(RestaurantContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [restaurantLogo, setRestaurantLogo] = useState();
  const [categoryToRef, setCategoryToRef] = useState({});
  const [categoryToTabRef, setCategoryToTabRef] = useState({});
  const [tabBarRef, setTabBarRef] = useState();
  const [activeCategoryId, setActiveCategoryId] = useState();
  const [menuBanner, setMenuBanner] = useState();

  // For window's event listener to get the states in this React component
  const stateRef = useRef();
  stateRef.current = {
    categoryToRef,
    activeCategoryId,
  };

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
    const newCategoryToTabRef = {};
    context.menu.categories.forEach((c) => {
      newCategoryToRef[c.id] = React.createRef();
      newCategoryToTabRef[c.id] = React.createRef();
    });
    setTabBarRef(React.createRef());
    setCategoryToRef(newCategoryToRef);
    setCategoryToTabRef(newCategoryToTabRef);
    setActiveCategoryId(context.menu.categories[0]?.id);
  }, [context.menu]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [context.selectedMenuIndex]);

  // Triggered when the entire document scrolls
  function onScroll() {
    // Find the largest non-positive offset from tab bar.
    let runningMax = Number.MIN_SAFE_INTEGER;
    let activeId = stateRef.current.activeCategoryId;
    for (const id in stateRef.current.categoryToRef) {
      const offset = stateRef.current.categoryToRef[id].current.getBoundingClientRect().top - 118;
      if (offset > 0) { continue; }
      if (runningMax < offset) {
        runningMax = offset;
        activeId = id;
      }
    }
    setActiveCategoryId(activeId);
  }

  useLayoutEffect(() => {
    if (activeCategoryId) {
      const tabRef = categoryToTabRef[activeCategoryId];
      const rect = tabRef.current.getBoundingClientRect();
      const left = rect.left - window.innerWidth / 2 + rect.width / 2;
      tabBarRef.current.scrollBy({
        behavior: 'smooth',
        left: left,
      })
    }
  }, [activeCategoryId]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function onSelectTab(id) {
    const category = categoryToRef[id].current;
    const scrollAmount = category.getBoundingClientRect().top - 118;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  }

  useEffect(() => {
    if(context.restaurant) {
      getRestaurantLogo(context.restaurant.id).then((logo) => {
        setRestaurantLogo(logo)
      })
    }
  }, [context.restaurant])

  function onClickHambergerMenu() {
    setHamburgerOpen(!hamburgerOpen);
  }
  
  return (
    <MenuScreen>
      <MenuListNav onClose={() => {setHamburgerOpen(false)}} open={hamburgerOpen}/>
      <Header>
        <NotificationBanner style={(context.activeFilters.size > 0 && !filterOpen) ? null : { display: "none" }}> 
          <Counter active={context.activeFilters.size > 0} style={{backgroundColor: "white", color:"#628DEB"}}>
            {context.activeFilters.size}
          </Counter>
          FILTER APPLIED
        </NotificationBanner>
        
        <AllMenusButton variant="link" onClick={onClickHambergerMenu}> 
          SEE MENUS
        </AllMenusButton>
        {
          context.restaurant ?
          <RestaurantLogo href={ context.restaurant.logo}>
            <img
              alt={`${context.restaurant.name} logo`}
              src={ restaurantLogo }
              />
          </RestaurantLogo> : <></>
        }
        <FilteringButton>
          {
          context.menu.hasAllergens ?
            <FilterSidePanel
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
            /> : ""
          }
        </FilteringButton>
      
        <CategoryTabList ref={tabBarRef}>
          {context.menu.categories.map(c => {
            const active = c.id === activeCategoryId;
            return <CategoryTab
              key={c.id}
              active={active}
              onClick={() => onSelectTab(c.id)}
              ref={categoryToTabRef[c.id]}
            >
              {c.name}
              {active ? <BlueDot /> : <></>}
            </CategoryTab>;
          })}
        </CategoryTabList>
      </Header>
      <MenuBody>
        <StyledBanner src={ menuBanner }>
          <BannerContent>
            <RestaurantName>{ context.restaurant.name }</RestaurantName>
            <MenuName
              onClick={() => setHamburgerOpen(true)}
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
    </MenuScreen>
  );
}