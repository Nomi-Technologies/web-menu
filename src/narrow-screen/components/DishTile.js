import React from 'react';
import SharedDishTile from 'components/SharedDishTile';
import AllergenModal from 'components/AllergenModal';
import InfoButton from 'components/InfoButton';
import styled from "styled-components";

const DishTile = styled(SharedDishTile)`
  margin-bottom: 10px;
`;

export default function(props) {

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <DishTile
        dish={props.dish}
        onClick={() => setShowModal(true)}
      />
      <AllergenModal
        dish={props.dish}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}