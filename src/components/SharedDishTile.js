import React, { useContext } from "react";
import styled from "styled-components";
import RestaurantContext from "../RestaurantContext";
import Banner from "components/Banner";

const DishTile = styled.div`
  font-family: "Source Serif Pro";
  background-color: white;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0 0 5px #e3edf2;
  cursor: pointer;
`;

const TextSection = styled.div`
  padding: 20px;
`;

const TileTitle = styled.div`
  height: 100%;
  line-height: 24px;
  display: flex;
  flex-flow: row;
`;

const Name = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 1 1 auto;
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

const TitleTrailing = styled.div`
  font-weight: bold;
  flex: 0 0 auto;
`;

const TileSubtitle = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 7px;
`;

const Description = styled.p`
  flex: 1 1 auto;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  margin: 0;
`;

const OrangeDot = styled.div`
  /* position: absolute; */
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: #f3a35c;
  margin-left: 8px;
  display: inline-block;
`;

const StyledBanner = styled(Banner)`
  border-radius: 10px 10px 0px 0px;
  height: 200px;
  width: 100%;
  background-position: center;
`;

export default function (props) {
  let context = useContext(RestaurantContext);
  const imageUrl = props.imageUrl;
  const imageExists = imageUrl !== null && imageUrl !== undefined;
  let showRemovableNotice =
    props.dish.Tags.some(
      (tag) =>
        tag.DishTag.removable && context.activeFilters?.allergens.has(tag.id)
    ) ||
    (props.dish.gfp &&
      context.activeFilters?.allergens.has(context.allergens["Gluten"]));
  return (
    <DishTile className={props.className} onClick={props.onClick}>
      {imageExists && <StyledBanner src={imageUrl} removeOverlay />}
      <TextSection>
        <TileTitle>
          <Name>
            {props.dish.name}
            {showRemovableNotice ? <OrangeDot /> : ""}
          </Name>
          {props.dish.price ? (
            <TitleTrailing>{"$" + props.dish.price}</TitleTrailing>
          ) : (
            <></>
          )}
        </TileTitle>
        {props.dish.description ? (
          <TileSubtitle>
            <Description>{props.dish.description}</Description>
          </TileSubtitle>
        ) : (
          <></>
        )}
      </TextSection>
    </DishTile>
  );
}
