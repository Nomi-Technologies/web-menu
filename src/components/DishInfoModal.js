import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { ReactComponent as Exit } from 'components/exit-button.svg';
import AllergenIcon from 'components/AllergenIconWithName';
import RemovableNotice from './RemovableNotice';
import RestaurantContext from '../RestaurantContext';
import { getDishImage } from 'utils';
import Banner from 'components/Banner';

const ModalContainer = styled.div`
  color: black;
  border-radius: 6px;
  background-color: white;
  width: 400px;
  max-height: 80vh;
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
  line-height: 1.3;
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
  padding-top: 14px;
  font-weight: 500;
  font-size: 14px;
`;

const StyledAllergenIcon = styled(AllergenIcon)`
  margin: 0 10px 10px 0;
`;

const Price = styled.span`
  font-weight: 500;
`;

const StyledRemovableNotice = styled(RemovableNotice)`
  margin-bottom: 10px;
`;

const StyledBanner = styled(Banner)`
  border-radius: 6px;
  height: 200px;
`;

export default function(props) {
  const context = useContext(RestaurantContext);
  const [dishImage, setDishImage] = useState();

  useEffect(() => {
    if(context.restaurant && context.selectedMenuIndex !== null) {
      getDishImage(props.dish.id).then((banner) => {
        setDishImage(banner)
      })
    }
  }, [context.restaurant])

  // show if gluten is being filtered and dish is gluten free, or if dish has a removable allergen that is beig filtered
  let showRemovableNotice = props.dish.Tags.some((tag) => tag.DishTag.removable && context.activeFilters?.has(tag.id))
  || props.dish.gfp && context.activeFilters?.has(context.allergens['Gluten'])

  return (
    <Modal
      // className='react-bootstrap-modal'
      show={props.show}
      aria-labelledby="contained-modal-vcenter"
      onHide={props.onHide}
      centered
    >
      <StyledBanner src={ dishImage } />
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
                showRemovableNotice ?
                <StyledRemovableNotice /> : null
              }
              {
                props.dish.Tags.length > 0 ?
                (
                  props.dish.Tags.map(t => <StyledAllergenIcon key={t.id} tag={t} showNotice={ context.activeFilters.has(t.id) }/>)
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
