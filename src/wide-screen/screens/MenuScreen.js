import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import RestaurantContext from '../../RestaurantContext'
import MenuList from "../components/CategoryDishList";
import ExpansionArrow from "components/ExpansionArrow";
import Banner from "components/Banner";
import { getMenuBannerImage } from 'utils'
import RemovableNotice from 'components/RemovableNotice';

import HotScrollSidePanel from "../components/HotScrollSidePanel";
import AllergenFiltersSidePanel from "../components/AllergenFiltersSidePanel";
import QRCodeSidePanel from "../components/QRCodeSidePanel";
import { ReactComponent as NomiLogo } from "components/nomi-withword.svg";
import styled from "styled-components";

const ColumnStyle = styled.div`
  position: fixed;
  top: 0;
  padding: 0 32px;
  padding-top: 70px; /* align: same as MenuScreen's margin-top */
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
`;

const LeftPanelWrapper = styled(ColumnStyle)`
  width: 20%;
  min-width: 250px;
  @media (max-width: 1440px) {
    width: 25%;
  }
`;

const Panel = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;

  /* Menu Sections */
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 72.21%;

  /* White */

  background: #ffffff;
  /* card-shadow-3 */

  box-shadow: 0px 8px 20px rgba(0, 20, 63, 0.05);
  border-radius: 6px;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  margin-bottom: 15px;
`;

const HeaderStyle = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
  line-height: 40px; /* vertically center stuff */
  display: flex;
  flex-direction: row;
  display: inline-block;
  font-weight: bold;
  padding-left: 20px;
  align-items: center;

  & div {
    display: inline-block;
    font-weight: 700;
  }

  .text {
    width: 60%;
    line-height: 140%;
  }
`;

const ExpandArrowStyle = styled(ExpansionArrow)`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const PanelBodyStyle = styled.div`
  width: 100%;
  padding: 10px 15px 10px 15px;
`;

function LeftPanel({ categoryToRef }) {
  
  const context = useContext(RestaurantContext);
  const [hotScrollPanelExpanded, setHotScrollPanelExpanded] = useState(true);
  const [allergenFiltersPanelExpanded, setAllergenFiltersPanelExpanded] = useState(true);

  return (
    <LeftPanelWrapper>
      <Panel>
        <HotScrollSidePanel
          StyledHeader={HeaderStyle}
          StyledExpandArrow={ExpandArrowStyle}
          StyledBody={PanelBodyStyle}
          categoryToRef={categoryToRef}
          expanded={hotScrollPanelExpanded}
          onExpansionChanged={setHotScrollPanelExpanded}
        />
      </Panel>
      { context.menu.hasAllergens && context.menu.enableFiltering ? 
        <Panel>
          <AllergenFiltersSidePanel
            StyledHeader={HeaderStyle}
            StyledExpandArrow={ExpandArrowStyle}
            StyledBody={PanelBodyStyle}
            expanded={allergenFiltersPanelExpanded}
            onExpansionChanged={setAllergenFiltersPanelExpanded}
          />
        </Panel> : "" 
      }      
      <Panel>
        <QRCodeSidePanel StyledBody={PanelBodyStyle} />
      </Panel>
    </LeftPanelWrapper>
  );
}

const RightPanelWrapper = styled(ColumnStyle)`
  right: 0;
  width: 20%;
  @media (max-width: 1440px) {
    display: none;
  }
`;

function RightPanel() {
  return <RightPanelWrapper></RightPanelWrapper>;
}

const MainContentWrapper = styled.div`
  margin: 0 auto;
  padding: 0 10px;
  width: 60%;
  @media (max-width: 1440px) {
    width: 75%;
    margin: 0 0 0 25%;
  }
`;


const StyledBanner = styled(Banner)`
  height: 250px;
`;

const RestaurantName = styled.div`
  font-weight: bold;
  font-size: 36px;
  color: #ffffff;
  z-index: 20;
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
  color: #c4cedb;
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
    filter: invert(86%) sepia(55%) saturate(2144%) hue-rotate(177deg)
      brightness(78%) contrast(78%);
  }
`;

function MainContent({ categoryToRef }) {
  const context = useContext(RestaurantContext);
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
    originalDishes.forEach((d) => {
      if (!context.excludedDishes.has(d.id) && context.includedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  return (
    <MainContentWrapper>
      <StyledBanner src={ menuBanner }>
        <RestaurantName>{context.restaurant.name.toUpperCase()}</RestaurantName>
      </StyledBanner>
      <DishList>
        {
          context.menu.hasRemovables ?
          <RemovableNotice /> : null
        }
        {context.menu.categories.map((c) => {
          return (
            <MenuList
              menuHasAllergens={context.menu.hasAllergens}
              reactRef={categoryToRef[c.id]}
              dishes={getDishByCategoryIdWithFilter(c.id)}
              category={c}
              key={c.id}
            />
          );
        })}
      </DishList>
      <NomiBottomLogo>
        <NomiBottomLogoText>Powered by</NomiBottomLogoText>
        <NomiBottomLogoImage href="https://www.dinewithnomi.com/">
          <NomiLogo width="70px" height="16px" fill="#8A9DB7" />
        </NomiBottomLogoImage>
      </NomiBottomLogo>
    </MainContentWrapper>
  );
}

const MenuScreen = styled.div`
  margin-top: 50px;
  padding-top: 20px;
`;

export default () => {
  const context = useContext(RestaurantContext);
  const [categoryToRef, setCategoryToRef] = useState({});

  useEffect(() => {
    let categoryToRef = {};

    context.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      categoryToRef[c.id] = categoryRef;
    });

    setCategoryToRef(categoryToRef);
  }, []);


  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [context.selectedMenuIndex]);

  useEffect(() => {
    let categoryToRef = {};

    context.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      categoryToRef[c.id] = categoryRef;
    });

    setCategoryToRef(categoryToRef);
  }, [context.menu]);


  return (
    <MenuScreen>
      <LeftPanel categoryToRef={categoryToRef} />
      <MainContent categoryToRef={categoryToRef} />
      <RightPanel />
    </MenuScreen>
  );
}
