import React from 'react';
import DishTile from './DishTile';
import styled from 'styled-components';

const DishList = styled.div`
  position: relative;
  padding: 24px 16px 0px 16px;
  z-index: 1;
`;

export default function(props) {
  return (
    <DishList>
      {props.dishes.map(dish => <DishTile key={dish.name} dish={dish}/>)}
    </DishList>
  );
}
