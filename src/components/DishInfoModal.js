import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { ReactComponent as Exit } from 'components/exit-button.svg';
import AllergenIcon from 'components/AllergenIconWithName';

const ModalContainer = styled.div`
  color: black;
  border-radius: 6px;
  background-color: white;
  width: 400px;
  max-height: 500px;
  margin: 0 auto;
  overflow: auto;
  position: relative;
  padding-bottom: 30px;

  @media (max-width: 400px) {
    width: auto;
    margin: 0 15px;
    box-sizing: border-box;
  }
`;

const ModalHeader = styled(Modal.Header)`
  padding: 10px 0 0 20px;
  height: 100%;
  border-radius: 6px 6px 0px 0px;
  border-bottom: 1px solid #DCE2E9;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  align-items: center;
`;

const DishName = styled.div`
  flex: 1 1 auto;
  height: 100%;
  font-weight: bold;
  font-size: 28px;
  font-family: 'Source Serif Pro';
  line-height: 1.5em;
  margin-top: auto;
  margin-bottom: 15px;
`;

const ExitButtonWrapper = styled.div`
  flex: 0 0 auto;
  height: 75px;
  width: 75px;
  cursor: pointer;
`;

const ExitButton = styled(Exit)`
  height: 100%;
  margin: 0 auto;
  display: block;
`;

const ModalBody = styled(Modal.Body)`
  padding: 0 20px;
`;

const Description = styled.div`
  font-size: 14px;
`;

const Divider = styled.div`
  margin: 18px 0;
  border-top: 1px solid #DCE2E9;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 10px;
`;

const SectionBody = styled.div`
  color: #8A9DB7;
  padding-top: 18px;
  font-weight: 500;
  font-size: 14px;
`;

const StyledAllergenIcon = styled(AllergenIcon)`
  margin: 0 10px 10px 0;
`;

const Price = styled.span`
  font-weight: 500;
`;

export default function(props) {
  return (
    <Modal
      // className='react-bootstrap-modal'
      show={props.show}
      aria-labelledby="contained-modal-vcenter"
      onHide={props.onHide}
      centered
    >
      <ModalContainer>
        <ModalHeader>
          <DishName>{props.dish.name}</DishName>
          <ExitButtonWrapper
            onClick={props.onHide}
          >
            <ExitButton/>
          </ExitButtonWrapper>
        </ModalHeader>
        <ModalBody>
        <SectionTitle>DESCRIPTION</SectionTitle>
          <SectionBody>
            {
              props.dish.description.length > 0 ?
              <>
                <Description>{props.dish.description}</Description>

              </> : <></>
            }
          </SectionBody>
          { props.menuHasAllergens ? 
          <>
            <Divider/>
            <SectionTitle>ALLERGENS</SectionTitle>
            <SectionBody>
              {
                props.dish.Tags.length > 0 ?
                (
                  props.dish.Tags.map(t => <StyledAllergenIcon key={t.id} tag={t}/>)
                )
                :
                "No Allergy Info"
              }
            </SectionBody>
          </>  : ""
          }

          {
            props.dish.price.length > 0 ?
            <>
              <Divider/>
              <SectionTitle>PRICE</SectionTitle>
              <SectionBody><Price>{props.dish.price}</Price></SectionBody>
            </> : <></>
          }
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}