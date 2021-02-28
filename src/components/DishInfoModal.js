import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
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
  margin: 0 auto;
  overflow: auto;
  position: relative;
  padding: 24px;

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
  border: 0;
  width: 100%;
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
  line-height: 20px;
  font-family: 'HK Grotesk';
  font-style: normal;
  font-weight: normal;
  color: #606060;
`;

const Divider = styled.div`
  margin: 18px 0;
  border-top: 1px solid #DCE2E9;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-family: 'HK Grotesk';
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 20px;
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
  margin-bottom:8px;
  width: 100%;

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
  color: black;
  margin-right: 4px;
`;

const AddOnNotes = styled.span`
  font-weight: 500;
  color: #8A9DB7;
`;

const AddOnPrice = styled.span`
  font-weight: 500;
  color: #8A9DB7;
  margin-left: auto;
`;

const QuantitySelector = styled.span`
  font-weight: 700;
  font-size: 18px;
  padding: 15px 20px;
  border-radius: 6px;
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
  background-color: #0D5959;
  padding: 15px 25px;
  border-radius: 6px;
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

const OptionCheckbox = styled.span`
  border: 1px solid black;
`;

export default function(props) {

  const context = useContext(RestaurantContext);

  const editMode = typeof props.index !== 'undefined';
  const savedDish = editMode ? context.savedDishes[props.index] : undefined;
  const dishData = editMode ? context.dishesById[savedDish.id] : props.dish;

  // set activeModifications to saved data (extracting from dishData with modIds)
  const [activeModifications, setActiveModifications] = React.useState(
    editMode ?
    savedDish.modIds.map((id) => dishData.Modifications.find((mod) => mod.id === id)) : []
  );
  const [quantity, setQuantity] = React.useState(editMode ? savedDish.quantity : 1);
  // price of one dish, including mods
  const [unitDishPrice, setUnitDishPrice] = React.useState(parseInt(dishData.price));

  const [dishImage, setDishImage] = useState();

  useEffect(() => {
    if(props.show && context.restaurant && context.selectedMenuIndex !== null) {
      getDishImage(dishData.id).then((banner) => {
        setDishImage(banner)
      })
    }
  }, [context.restaurant, props.show])

  // show if gluten is being filtered and dish is gluten free, or if dish has a removable allergen that is beig filtered
  let showRemovableNotice = dishData.Tags.some((tag) => tag.DishTag.removable && context.activeFilters?.allergens.has(tag.id))
  || dishData.gfp && context.activeFilters?.allergens.has(context.allergens['Gluten'])

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
    const newPrice = activeModifications.reduce((total, currentMod) => total + parseInt(currentMod.price), parseInt(dishData.price));
    setUnitDishPrice(newPrice);
  }

  function saveDish() {
    let savedDishes = [...context.savedDishes];
    const updatedEntry = {
      quantity,
      id: dishData.id,
      modIds: activeModifications.map((mod) => mod.id) ?? [],
    };

    if (editMode) {
      savedDishes[props.index] = updatedEntry;
    } else {
      savedDishes.push(updatedEntry);
    }

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
          <DishName>{dishData.name}</DishName>
          <ExitButtonWrapper
            onClick={props.onHide}
          >
            <ExitButton/>
          </ExitButtonWrapper>
        </ModalHeader>
        <ModalBody>
          {
            dishData.description.length > 0 ?
            <>
              <Description>{dishData.description}</Description>

            </> : <></>
          }
          { props.menuHasAllergens ?
          <>
            <Divider/>
            <SectionTitle>ALLERGEN INFO</SectionTitle>
            <SectionBody>
              {
                showRemovableNotice ?
                <StyledRemovableNotice /> : null
              }
              {
                dishData.Tags.length > 0 ?
                (
                  dishData.Tags.map(t => <StyledAllergenIcon key={t.id} tag={t} showNotice={ context.activeFilters.allergens.has(t.id) }/>)
                )
                :
                "No Allergy Info"
              }
            </SectionBody>
          </>  : ""
          }
          {
            dishData.Modifications.length > 0 ?
            <>
              <Divider/>
              <SectionTitle>DISH OPTIONS</SectionTitle>
              <SectionBody style={{ flexDirection: "column", alignItems: "flex-start"}}>
              { dishData.Modifications.map(t =>
                <AddOn key={t.id}>
                  <label className="container">
                    <AddOnName>{t.name} </AddOnName>
                    { t.description ? <AddOnNotes> ({t.description})</AddOnNotes> : <></>}
                    { t.price !=="0" ? <AddOnPrice> (+${t.price})</AddOnPrice> : <></>}
                    <input
                      checked={activeModifications.some((mod) => mod.id === t.id)}
                      type="checkbox"
                      onClick={() => toggleModification(t)}
                    />
                    <OptionCheckbox className="checkmark"></OptionCheckbox>
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
              <span>${  dishData.price.length > 0 ? unitDishPrice * quantity : null }</span>
            </SaveDishButton>
          </SectionBody>
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
}
