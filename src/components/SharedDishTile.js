import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import styled from "styled-components";

const DishTile = styled(Jumbotron)`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0 0 5px #E3EDF2;
`;

const TileTitle = styled.div`
  height: 24px;
  line-height: 24px;
  display: flex;
  flex-flow: row;
  margin-bottom: 12px;
`;

const Name = styled.div`
  display: inline-block;
  flex: 1 1 auto;
  font-family: Source Serif Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;

const Price = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  font-family: Source Serif Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
`;

const TrailingBox = styled.div`
  flex: 0 0 auto;
`;

const TileSubtitle = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 18px;
`;

const Description = styled.div`
  flex: 1 1 auto;
`;


export default function (props) {
  return (
    <DishTile className={props.className}>
      <TileTitle>
        <Name>{props.dish.name}</Name>
        <Price>{props.dish.price}</Price>
      </TileTitle>
      <TileSubtitle>
        <Description>{props.dish.description}</Description>
        <TrailingBox>{props.subtitleTrailing}</TrailingBox>
      </TileSubtitle>
    </DishTile>
  )
}
