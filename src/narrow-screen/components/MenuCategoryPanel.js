import React from "react";
import DishTile from "./DishTile";
import styled from "styled-components";

const DishList = styled.div`
  font-family: "Source Serif Pro";
  position: relative;
  padding: 24px 16px 0px 16px;
  z-index: 1;
  overflow: auto;
`;

const CategoryTitle = styled.div`
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
  font-style: normal;
  font-family: "HK Grotesk";
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.02em;
  color: #777777;
  flex: none;
  order: 1;
  padding-bottom: 10px;
`;

const NoDishesMessage = styled.p`
  font-style: italic;
  font-size: 16px;
`;

export default function (props) {
  return (
    <DishList className={props.className} ref={props.categoryRef}>
      <CategoryTitle>{props.category.name}</CategoryTitle>
      {props.dishes.length > 0 ? (
        <>
          <CategoryDescription>
            {props.category.description}
          </CategoryDescription>
          {props.dishes.map((dish) => (
            <DishTile
              key={dish.id}
              dish={dish}
              menuHasAllergens={props.menuHasAllergens}
            />
          ))}
        </>
      ) : (
        <NoDishesMessage>
          No dishes in this section. Check the applied filters.
        </NoDishesMessage>
      )}
    </DishList>
  );
}
