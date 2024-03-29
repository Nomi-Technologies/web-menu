import React from "react";
import DishTile from "./DishTile";
import styled from "styled-components";
import { Col } from "react-bootstrap";

const CategorySection = styled.div`
  font-family: "Source Serif Pro";
  padding-top: 30px;
`;

const Title = styled.div`
  height: 22px;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
`;

const Description = styled.div`
  font-size: 16px;
  padding-top: 10px;
  color: #777777;
  font-family: "HK Grotesk";
  line-height: 25px;
  letter-spacing: 0.02em;
`;

const DishGrid = styled.div`
  position: relative;
  z-index: 1;
  padding: 24px 0 0 0;
  display: flex;
`;

const Column = styled(Col)`
  padding: 0;
`;

const ColumnSeparator = styled(Column)`
  max-width: 15px;
`;

const NoDishesMessage = styled.p`
  font-style: italic;
  font-size: 16px;
`;

export default (props) => {
  return (
    <CategorySection ref={props.reactRef}>
      <Title>{props.category.name}</Title>
      {props.category.description ? (
        <Description>{props.category.description}</Description>
      ) : (
        ""
      )}
      <DishGrid>
        {props.dishes.length > 0 ? (
          <>
            <Column>
              {props.dishes
                .slice(0, Math.ceil(props.dishes.length / 2))
                .map((dish) => (
                  <DishTile
                    key={dish.id}
                    dish={dish}
                    menuHasAllergens={props.menuHasAllergens}
                  />
                ))}
            </Column>
            <ColumnSeparator />
            <Column>
              {props.dishes
                .slice(Math.ceil(props.dishes.length / 2))
                .map((dish) => (
                  <DishTile
                    key={dish.id}
                    dish={dish}
                    menuHasAllergens={props.menuHasAllergens}
                  />
                ))}
            </Column>
          </>
        ) : (
          <NoDishesMessage>
            No dishes in this section. Check the applied filters.
          </NoDishesMessage>
        )}
      </DishGrid>
    </CategorySection>
  );
};
