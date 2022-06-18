import React, { useEffect } from "react";
import SharedDishTile from "components/SharedDishTile";
import DishInfoModal from "components/DishInfoModal";
import styled from "styled-components";
import { getDishImage } from "utils";

const DishTile = styled(SharedDishTile)`
  margin-bottom: 10px;
`;

export default function (props) {
  const [showModal, setShowModal] = React.useState(false);
  const [dishImageUrl, setDishImageUrl] = React.useState("");

  useEffect(() => {
    getDishImage(props.dish.id).then((url) => setDishImageUrl(url));
  }, []);

  /* Narrow-screen only: show image if exists above tile */
  return (
    <>
      <DishTile
        dish={props.dish}
        imageUrl={dishImageUrl}
        onClick={() => setShowModal(true)}
      />
      <DishInfoModal
        dish={props.dish}
        show={showModal}
        onHide={() => setShowModal(false)}
        menuHasAllergens={props.menuHasAllergens}
      />
    </>
  );
}
