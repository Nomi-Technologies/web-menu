import React, { useContext } from 'react';
import RestaurantContext from '../RestaurantContext';
import styled from 'styled-components';

const SideNav = styled.div`
  min-width: 240px;
  background: #F2F3F5;
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100%;
  z-index: 16;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 240px) {
    width: 100%;
  }
`

const Tile = styled.div`
  padding-left: 25px;
  cursor: pointer;
  letter-spacing: 0.1em;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

const MenuTile = styled(Tile)`
  height: 40px;
  line-height: 40px;
  ${( {active} ) => active ? 
    `
    color: white;
    background-color: #628DEB;
    ` : `
    color: #8A9DB7;
    background-color: transparent;
    `
  }
`;

const CloseButton = styled(Tile)`
  margin: 12px 0 48px 0;
  height: 30px;
  line-height: 30px;
  color: #628DEB;
`;

export default function(props) {
  const context = useContext(RestaurantContext);
  
  return (
    <SideNav open={props.open}>
      <CloseButton onClick={props.onClose}>
        CLOSE
      </CloseButton>
      {context.restaurant?.Menus.map((menu, i) =>
        <MenuTile
          key={menu.id}
          active={context.selectedMenuIndex === i}
          onClick={() => {
            context.setSelectedMenu(i);
            props.onClose();
          }}
        >
          {menu.name}
        </MenuTile>)}
    </SideNav>
  )
};
