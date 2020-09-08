import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const SideNav = styled.div`
  min-width: 250px;
  padding: 80px 40px;
  background: #F2F3F5;
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100%;
  z-index: 16;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`

const MenuTile = styled(Button)`
  height: 35px;
  display: block;
  width: 100%;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default function(props) {
  return (
    <SideNav open={props.open}>
      {props.menus.map((menu, i) =>
        <MenuTile
          key={menu.id}
          variant={props.selectedIndex === i ? 'info': 'outline-info'}
          onClick={() => props.onSelectMenu(i)}
        >
          {menu.name}
        </MenuTile>)}
    </SideNav>
  )
};
