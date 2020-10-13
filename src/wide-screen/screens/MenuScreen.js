import React, { useState, useEffect } from "react";
import MenuList from "../components/CategoryDishList";
import ExpansionArrow from "components/ExpansionArrow";
import Banner from "components/Banner";

import HotScrollSidePanel from "../components/HotScrollSidePanel";
import AllergenFiltersSidePanel from "../components/AllergenFiltersSidePanel";
import QRCodeSidePanel from "../components/QRCodeSidePanel";

import { ReactComponent as NomiLogo } from "components/nomi-withword.svg";
import styled from "styled-components";

const ColumnStyle = styled.div`
  padding: 20px 16px;
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
  margin: 15px 15px;
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

function LeftPanel(props) {
  return (
    <LeftPanelWrapper>
      <Panel>
        <HotScrollSidePanel
          StyledHeader={HeaderStyle}
          StyledExpandArrow={ExpandArrowStyle}
          StyledBody={PanelBodyStyle}
          categories={props.menu.categories}
          categoryToRef={props.categoryToRef}
          expanded={props.hotScrollPanelExpanded}
          onExpansionChanged={props.onHotScrollPanelExpansionChanged}
        />
      </Panel>
      { props.menu.hasAllergens ? 
        <Panel>
            <AllergenFiltersSidePanel
              StyledHeader={HeaderStyle}
              StyledExpandArrow={ExpandArrowStyle}
              StyledBody={PanelBodyStyle}
              tags={props.menu.tags}
              expanded={props.allergenFiltersPanelExpanded}
              onExpansionChanged={props.onAllergenFiltersPanelExpansionChanged}
              onApplyFilter={props.onApplyFilter}
              onClearFilter={props.onClearFilter}
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
  width: 20%;
  @media (max-width: 1440px) {
    display: none;
  }
`;

function RightPanel() {
  return <RightPanelWrapper></RightPanelWrapper>;
}

const MainContentWrapper = styled(ColumnStyle)`
  width: 60%;
  @media (max-width: 1440px) {
    width: 75%;
  }
`;


const StyledBanner = styled(Banner)`
  height: 250px;
  border-radius: 5px;
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

function MainContent(props) {
  return (
    <MainContentWrapper>
      <StyledBanner>
        <RestaurantName>{props.restaruantName}</RestaurantName>
      </StyledBanner>
      <DishList>
        {props.menu.categories.map((c) => {
          const dishes = props.getDishByCategoryIdWithFilter(c.id);
          return (
            <MenuList
              menuHasAllergens={ props.menu.hasAllergens }
              reactRef={props.categoryToRef[c.id]}
              dishes={dishes}
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
  position: relative;
  display: flex;
  flex-flow: row;
  flex: 1 1 auto;
  overflow: hidden;
`;

export default (props) => {

  const [selected, setSelected] = useState(new Set());
  const [excludedDishes, setExcludedDishes] = useState(new Set());
  const [hotScrollPanelExpanded, setHotScrollPanelExpanded] = useState(true);
  const [allergenFiltersPanelExpanded, setAllergenFiltersPanelExpanded] = useState(true);
  const [categoryToRef, setCategoryToRef] = useState({});

  useEffect(() => {
    let categoryToRef = {};

    props.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      categoryToRef[c.id] = categoryRef;
    });

    setCategoryToRef(categoryToRef);
  }, []);

  useEffect(() => {
    let categoryToRef = {};

    props.menu.categories.forEach((c) => {
      const categoryRef = React.createRef();
      categoryToRef[c.id] = categoryRef;
    });

    setCategoryToRef(categoryToRef);
  }, [props.menu]);

  function onApplyFilter(selected) {
    let excluded = new Set();
    selected.forEach((t) =>
      props.menu.dishesByTags[t].forEach((d) => excluded.add(d.id))
    );
    setSelected(selected);
    setExcludedDishes(excluded);
  }

  function onClearFilter() {
    setSelected(new Set());
    setExcludedDishes(new Set());
  }

  function getDishByCategoryIdWithFilter(categoryId) {
    const originalDishes = props.menu.dishesByCategory[categoryId];
    let filtered = [];
    originalDishes.forEach((d) => {
      if (!excludedDishes.has(d.id)) {
        filtered.push(d);
      }
    });
    return filtered;
  }

  return (
    <MenuScreen {...props}>
      <LeftPanel
        menu={props.menu}
        selected={selected}
        categoryToRef={categoryToRef}
        hotScrollPanelExpanded={hotScrollPanelExpanded}
        allergenFiltersPanelExpanded={allergenFiltersPanelExpanded}
        onHotScrollPanelExpansionChanged={setHotScrollPanelExpanded}
        onAllergenFiltersPanelExpansionChanged={setAllergenFiltersPanelExpanded}
        onApplyFilter={onApplyFilter}
        onClearFilter={onClearFilter}
      />
      <MainContent
        menu={props.menu}
        excludedDishes={excludedDishes}
        categoryToRef={categoryToRef}
        restaruantName={props.restaurantName.toUpperCase()}
        getDishByCategoryIdWithFilter={getDishByCategoryIdWithFilter}
      />
      <RightPanel />
    </MenuScreen>
  );
}
