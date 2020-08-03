import React from 'react';
import SharedDishTile from '../../components/SharedDishTile';
import AllergenModal from '../../components/AllergenModal';
import styled from "styled-components";

const DishTile = styled(SharedDishTile)`
  margin-bottom: 10px;
  box-shadow: 0 0 20px #E3EDF2;
`;

const AllergenInfoButton = styled.button`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  line-height: 24px;
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  font-weight: bold;
  color: white;
  background-color: #8A9DB7;
`;

export default function(props) {

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <DishTile
        dish={props.dish}
        titleTrailing={
          <AllergenInfoButton className='info-btn' 
            onClick={() => setShowModal(true)}
          >
            i
          </AllergenInfoButton>
        }
      />
      <AllergenModal
        dish={props.dish}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}