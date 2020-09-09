import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MenuTabs = styled(Tabs)`
  width: 100%;
  margin-left: 13%;
`;

const MenuTab = styled(Tab)`
  height: 30px;
  display: inline-block;
  margin: 20px 15px 0 15px;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.25);

  &.is-selected {
    color: black;
    padding-bottom: 6px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: solid 4px #5383EC;
  }
`;

// TODO: Restrict the width of tab bar
// Maybe we also need to re-align the icons in the top bar
const MenuTabList = styled(TabList)`
  list-style-type: none;
  padding: 0 5px;
  overflow: auto;
  white-space: nowrap;
  position: sticky;
  background-color: white;
  z-index: 10;
`;

export default function(props) {
  return (
    <MenuTabs
      selectedIndex={props.selectedMenuIndex}
      forceRenderTabPanel={true}
      onSelect={props.onSelectMenu.bind(this)}
    >
      <MenuTabList>
        {
          props.menus.map((menu, i) =>
            <MenuTab
              key={menu.id}
              className={props.selectedMenuIndex === i ? 'is-selected': ''}
              onClick={() => props.onSelectMenu(i)}
            >
              {menu.name}
            </MenuTab>)
        }
      </MenuTabList>
    </MenuTabs>
  )
};
