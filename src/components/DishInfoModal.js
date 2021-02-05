import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { ReactComponent as Exit } from 'components/exit-button.svg';
import AllergenIcon from 'components/AllergenIconWithName';
import RemovableNotice from './RemovableNotice';
import RestaurantContext from '../RestaurantContext';
import { getDishImage, getSavedDishes, setSavedDishes } from 'utils';
import Banner from 'components/Banner';

const ModalContainer = styled.div`
  color: black;
  border-radius: 6px;
  background-color: white;
  width: 400px;
  margin: 0 auto;
  overflow: auto;
  position: relative;
  padding-bottom: 30px;

  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    max-height: none;
    border-radius: 0;
  }
`;

const ModalHeader = styled(Modal.Header)`
  padding: 10px 0 0 20px;
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
  display: flex;
  flex-direction: row;
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
const AddOn = styled.div`
  margin-bottom:10px;

  .container {
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .container input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    position: absolute;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #e1e7ec;
    border-radius: 5px;
  }
  
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  .container .checkmark:after {
    left: 7px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
const AddOnName = styled.span`
  font-weight: 500;
  color: black;
  font-weight: bold;
  margin-right: 4px;
`;

const AddOnNotes = styled.span`
  font-weight: 500;
  color: #8A9DB7;
`;

const QuantitySelector = styled.span`
  font-weight: 700;
  font-size: 18px;
  padding: 15px 20px;
  border-radius: 100px;
  border: none;
  background-color: #EBEEF5;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 170px;
`;

const SaveDishButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background-color: #F06441;
  padding: 15px 25px;
  border-radius: 100px;
  width: 60%;
  align-items: center;
  max-width: 300px;
`;

const Quantity = styled.span`
  color: #000000;
`;
const ChangeQuantity = styled.span`
  color: #8A9DB7;
  cursor: pointer;
`;


const StyledBanner = styled(Banner)`
  border-radius: 6px;
  height: 200px;
`;

export default function(props) {
  const context = useContext(RestaurantContext);
  const [activeModifications, setActiveModifications] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  // price of one dish, including mods
  const [unitDishPrice, setUnitDishPrice] = React.useState(parseInt(props.dish.price));

  const [dishImage, setDishImage] = useState();

  useEffect(() => {
    if(props.show && context.restaurant && context.selectedMenuIndex !== null) {
      getDishImage(props.dish.id).then((banner) => {
        setDishImage(banner)
      })
    }
  }, [context.restaurant, props.show])

  // show if gluten is being filtered and dish is gluten free, or if dish has a removable allergen that is beig filtered
  let showRemovableNotice = props.dish.Tags.some((tag) => tag.DishTag.removable && context.activeFilters?.has(tag.id))
  || props.dish.gfp && context.activeFilters?.has(context.allergens['Gluten'])

  function toggleModification(modification) {
    var arr;
    if(activeModifications.length === 0 || activeModifications.indexOf(modification) === -1){
      arr = activeModifications;
      arr.push(modification);
    } else {
      var index = activeModifications.indexOf(modification);
      arr = activeModifications;
      arr.splice(index, 1);
    }

    setActiveModifications(arr);
    const newPrice = activeModifications.reduce((total, currentMod) => total + parseInt(currentMod.price), parseInt(props.dish.price));
    setUnitDishPrice(newPrice);
  }

  function saveDish() {
    let savedDishes = [
      ...context.savedDishes,
      [quantity, props.dish.id, activeModifications.map((mod) => mod.id)],
    ];
    context.setSavedDishes(savedDishes);
    props.onHide();
  }

  return (
    <Modal
      className='react-bootstrap-modal'
      show={props.show}
      aria-labelledby="contained-modal-vcenter"
      onHide={props.onHide}
      centered
    >
      {
        dishImage ? 
        <StyledBanner src={ dishImage } /> 
        : ""
      }
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
              <SectionBody><Price>
                { unitDishPrice * quantity } 
              </Price></SectionBody>
            </> : <></>
          }
          {
            props.dish.Modifications.length > 0 ?
            <>
              <Divider/>
              <SectionTitle>OPTIONS</SectionTitle>
              <SectionBody style={{ flexDirection: "column", alignItems: "flex-start"}}>
              { props.dish.Modifications.map(t => 
                <AddOn key={t.id}>
                  <label className="container"> 
                    <AddOnName>{t.name} </AddOnName>
                    { t.description ? <AddOnNotes> ({t.description})</AddOnNotes> : <></>}
                    { t.price !=="0" ? <AddOnNotes> (${t.price})</AddOnNotes> : <></>}
                    <input type="checkbox" onClick={() => toggleModification(t)}/>
                    <span className="checkmark"></span>
                  </label>
                </AddOn>
              ) }
              </SectionBody> 
            </> : <></>
          }
          <Divider/>
          <SectionBody style={{justifyContent: "space-evenly" }}>
            <QuantitySelector> 
              <ChangeQuantity onClick={() => {
                if(quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}> - </ChangeQuantity>
              <Quantity> {quantity} </Quantity>
              <ChangeQuantity onClick={() => setQuantity(quantity + 1)}> + </ChangeQuantity>
            </QuantitySelector>
            <SaveDishButton onClick={saveDish}> 
              <span>{quantity > 1 ? "Save Dishes" : "Save Dish"}</span>
              <span>${  props.dish.price.length > 0 ? unitDishPrice * quantity : null }</span>
            </SaveDishButton>
          </SectionBody>
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}
