import React from "react";
import SharedDishTile from "components/SharedDishTile";
import DishInfoModal from "components/DishInfoModal";
import styled from "styled-components";

const DishTile = styled(SharedDishTile)`
  margin-bottom: 10px;
`;

export default function (props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <DishTile dish={props.dish} onClick={() => setShowModal(true)} />
      <DishInfoModal
        dish={props.dish}
        show={showModal}
        onHide={() => setShowModal(false)}
        menuHasAllergens={props.menuHasAllergens}
      />
    </>
  );
}
