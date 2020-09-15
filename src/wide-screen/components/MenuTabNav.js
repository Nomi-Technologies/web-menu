import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MenuTab = styled.div`
  display: inline-block;
  margin: 18px 15px 0 15px;
  color: rgba(0, 0, 0, 0.25);

  &.is-selected {
    color: black;
    padding-bottom: 10px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: solid 4px #5383EC;
  }
`;

const MenuTabList = styled.div`
  max-width: 100%;
  overflow: scroll;
  white-space: nowrap;
`;

export default function(props) {
  return (
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
  )
};
