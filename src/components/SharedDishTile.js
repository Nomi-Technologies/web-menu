import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import styled from "styled-components";

const Tile = styled(Jumbotron)`
  padding: 23px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px #E3EDF2;
  margin-bottom: 10px;
`;

const TileTitle = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 12px;
`;

const Name = styled.div`
  margin-top: 3px;
  display: inline-block;
  font-weight: 500;
  flex: 1 1 auto;
`;

const TrailingBox = styled.div`
  flex: 0 0 auto;
`;

const Separator = styled.div`
  border-top: solid 1px rgba(83, 131, 236, 0.15);
`;

const TileSubtitle = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 18px;
`;

const Description = styled.div`
  flex: 1 1 auto;
  font-weight: normal;
  font-style: italic;
`;


export default function DishTile(props) {
  return (
    <Tile className={props.className}>
      <TileTitle>
        <Name>{props.dish.name}</Name>
        <TrailingBox>{props.titleTrailing}</TrailingBox>
      </TileTitle>
      <Separator/>
      <TileSubtitle>
        <Description>{props.dish.description}</Description>
        <TrailingBox>{props.subtitleTrailing}</TrailingBox>
      </TileSubtitle>
    </Tile>
  )
}
