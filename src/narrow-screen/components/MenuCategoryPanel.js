import React from 'react';
import DishTile from './DishTile';
import styled from 'styled-components';

const DishList = styled.div`
  position: relative;
  padding: 24px 16px 0px 16px;
  z-index: 1;
`;

const CategoryTitle = styled.div`
  font-family: Source Serif Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.02em;
  color: #000000;
  flex: none;
  order: 0;
  align-self: center;
  margin: 10px 0px;
`;

const CategoryDescription = styled.div`
  font-family: Source Serif Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.02em;
  color: #000000;
  flex: none;
  order: 1;
  padding-bottom: 10px;
`;

export default function(props) {
  return (
    <DishList>
      <CategoryTitle>{props.category.name}</CategoryTitle>
      <CategoryDescription>{props.category.description}</CategoryDescription>
      {props.dishes.map(dish => <DishTile key={dish.id} dish={dish}/>)}
    </DishList>
  );
}
