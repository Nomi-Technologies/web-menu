import React from 'react';
import styled from 'styled-components';

const MenuTab = styled.div`
  display: inline-block;
  margin: 18px 15px 0 15px;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;

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
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
