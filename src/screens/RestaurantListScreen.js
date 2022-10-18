import React from "react";
import styled from "styled-components";
import SharedDishTile from "components/SharedDishTile";
import GoogleAds from "components/GoogleAds";

const List = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
`;

const RestaurantTile = styled(SharedDishTile)`
  margin-bottom: 10px;
`;

export default () => {
  // TODO(tony): redo the hacks
  return (
    <List>
      <RestaurantTile
        dish={{
          name: "Trio",
          description:
            "Tio has been a staple in Palm springs dining & cocktails since 2009 - we are Where Palm Springs Eats!",
        }}
        onClick={() => {
          window.location = "https://nomi.menu/trio-palm-springs";
        }}
      />
      <RestaurantTile
        dish={{
          name: "Demo Restaurant",
          description: "Demo Restaurant for nomi.menu.",
        }}
        onClick={() => {
          window.location = "https://nomi.menu/demo-restaurant";
        }}
      />
      <GoogleAds slot="1539889712" />
    </List>
  );
};
