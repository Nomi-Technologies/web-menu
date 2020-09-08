import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const CategoryTab = styled(Tab)`
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

const CategoryTabList = styled(TabList)`
  list-style-type: none;
  margin: 0;
  padding: 0 5px;
  overflow: auto;
  white-space: nowrap;
  position: sticky;
  background-color: white;
  z-index: 10;
`;

export default function(props) {
  return (
    <Tabs
      selectedIndex={props.selectedMenuIndex}
      forceRenderTabPanel={true}
      onSelect={props.onSelectMenu.bind(this)}
    >
      <CategoryTabList>
        {
          props.menus.map((menu, i) =>
            <CategoryTab
              key={menu.id}
              className={props.selectedMenuIndex === i ? 'is-selected': ''}
              onClick={() => props.onSelectMenu(i)}
            >
              {menu.name}
            </CategoryTab>)
        }
      </CategoryTabList>
    </Tabs>
  )
};
