import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import { ReactComponent as Exit } from "components/exit-button.svg";
import RestaurantContext from "../RestaurantContext";
import { getDishImage } from "utils";
import Banner from "components/Banner";
import InfoIcon from "./InfoIcon.png";
import CheckMark from "./CheckMarkIcon.png";

const ModalContainer = styled.div`
  color: black;
  border-radius: 10px;
  background-color: white;
  width: 400px;
  margin: 0 auto;
  overflow: auto;
  position: relative;
  padding: 18px;

  @media (max-width: 500px) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    max-height: none;
    border-radius: 0;
  }
`;

const ModalHeader = styled(Modal.Header)`
  border: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  padding-right: 26px;
`;

const DishName = styled.div`
  flex: 1 1 auto;
  height: 100%;
  font-weight: bold;
  font-size: 28px;
  font-family: "Source Serif Pro";
  line-height: 1.5em;
  margin-top: auto;
  margin-bottom: 15px;
`;

const ExitButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

const ExitButton = styled(Exit)`
  height: 100%;
  margin: 0 auto;
  display: block;
`;

const ModalBody = styled(Modal.Body)`
  padding: 0px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-family: "HK Grotesk";
  font-style: normal;
  font-weight: normal;
  white-space: pre-line;
  color: #606060;
  font-weight: 500;
`;

const Divider = styled.div`
  margin: 18px 0;
  border-top: 1px solid #dce2e9;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-family: "HK Grotesk";
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 20px;
  text-transform: uppercase;
`;

const SectionBody = styled.div`
  color: #8a9db7;
  font-weight: 500;
  font-size: 14px;
`;

const TagsWrapper = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 5px;
  padding: 10px 10px 10px 32px;
  background-color: #ebeef5;
  color: #627083;
  font-size: 12px;

  :first-letter {
    text-transform: uppercase;
  }

  :not(:last-child) {
    margin-bottom: 8px;
  }

  & img {
    width: 16px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

const TagName = styled.span`
  text-transform: lowercase;
  :not(:last-child)::after {
    content: ", ";
  }
  color: ${({ highlight }) => (highlight ? "#00807F" : "#627083")};
`;

const AddOn = styled.div`
  margin-bottom: 16px;
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

  .container input ~ .checkmark {
    border: 1px solid black;
  }

  .container input:checked ~ .checkmark {
    background-color: #00807f;
    border: none;
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
  color: #606060;
`;

const AddOnPrice = styled.span`
  font-weight: 500;
  color: #8a9db7;
  margin-left: auto;
`;

const QuantitySelector = styled.span`
  font-weight: 700;
  font-size: 14px;
  padding: 15px 20px;
  border-radius: 6px;
  border: none;
  background-color: #ebeef5;
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
  font-size: 14px;
  border: none;
  background-color: #0d5959;
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
  color: #8a9db7;
  cursor: pointer;
  font-size: 18px;
`;

const RemovableNotice = styled.div`
  display: inline-block;
  font-family: "HK Grotesk";
  font-weight: 500;
  font-size: 12px;
  padding: 8px 8px 8px 26px;
  background-color: transparent;
  border-radius: 6px;
  position: relative;
  letter-spacing: 0.02em;
  line-height: 18px;
  color: #627083;
  border-radius: 5px;
  border: 1px solid #e1e7ec;
  margin-bottom: 8px;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: #00807f;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translate(0, -50%);
`;

const StyledBanner = styled(Banner)`
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  height: 200px;
  width: 400px;
  margin: 0 auto;

  @media (max-width: 500px) {
    height: 300px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0;
  }
`;

const OptionCheckbox = styled.span``;

const RemoveDish = styled.p`
  padding-top: 16px;
  font-size: 14px;
  text-align: center;
  color: #00807f;
  font-weight: bold;
`;

export default function (props) {
  const context = useContext(RestaurantContext);

  const savedDish = context.savedDishes[props.index];
  const dishData = savedDish ? context.dishesById[savedDish.id] : props.dish;

  // set activeModifications to saved data (extracting from dishData with modIds)
  const [activeModifications, setActiveModifications] = React.useState(
    savedDish
      ? savedDish.modIds.map((id) =>
          dishData.Modifications.find((mod) => mod.id === id)
        )
      : []
  );

  const [quantity, setQuantity] = React.useState(
    savedDish ? savedDish.quantity : 1
  );

  // price of one dish, including mods
  const [unitDishPrice, setUnitDishPrice] = React.useState(
    activeModifications.reduce(
      (total, currentMod) => total + parseInt(currentMod.price),
      parseInt(dishData.price)
    )
  );

  const [dishImage, setDishImage] = useState();
  const [modalStyle, setModalStyle] = useState();

  useEffect(() => {
    if (
      props.show &&
      context.restaurant &&
      context.selectedMenuIndex !== null &&
      typeof dishData !== "undefined"
    ) {
      getDishImage(dishData.id).then((dishImage) => {
        if (dishImage !== null) {
          setDishImage(dishImage);
          setModalStyle({
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
          });
        }
      });
    }
  }, [context.restaurant, props.show]);

  // show if gluten is being filtered and dish is gluten free, or if dish has a removable allergen that is beig filtered
  let showRemovableNotice = dishData
    ? dishData.Tags.some(
        (tag) =>
          tag.DishTag.removable && context.activeFilters?.allergens.has(tag.id)
      ) ||
      (dishData.gfp &&
        context.activeFilters?.allergens.has(context.allergens["Gluten"]))
    : "";

  function toggleModification(modification) {
    var arr;
    if (
      activeModifications.length === 0 ||
      activeModifications.indexOf(modification) === -1
    ) {
      arr = [...activeModifications];
      arr.push(modification);
    } else {
      var index = activeModifications.indexOf(modification);
      arr = [...activeModifications];
      arr.splice(index, 1);
    }
    setActiveModifications(arr);
    const newPrice = arr.reduce(
      (total, currentMod) => total + parseInt(currentMod.price),
      parseInt(dishData.price)
    );
    setUnitDishPrice(newPrice);
  }

  function saveDish() {
    let savedDishes = [...context.savedDishes];
    const updatedEntry = {
      quantity,
      id: dishData.id,
      modIds: activeModifications.map((mod) => mod.id) ?? [],
    };

    if (savedDish) {
      savedDishes[props.index] = updatedEntry;
    } else {
      savedDishes.push(updatedEntry);
    }

    context.setSavedDishes(savedDishes);
    props.onHide();
  }

  function onDelete() {
    const savedDishes = [...context.savedDishes];
    savedDishes.splice(props.index, 1);
    context.setSavedDishes(savedDishes);
    props.onHide();
  }

  return (
    <Modal
      className="react-bootstrap-modal"
      show={props.show}
      aria-labelledby="contained-modal-vcenter"
      onHide={props.onHide}
      centered
    >
      {dishImage ? <StyledBanner src={dishImage} removeOverlay /> : ""}
      {dishData ? (
        <ModalContainer style={modalStyle}>
          <ExitButtonWrapper onClick={props.onHide}>
            <ExitButton />
          </ExitButtonWrapper>
          <ModalHeader>
            <DishName>{dishData.name}</DishName>
          </ModalHeader>
          <ModalBody>
            {dishData.description.length > 0 ? (
              <>
                <Description>{dishData.description}</Description>
              </>
            ) : (
              <></>
            )}
            {dishData.Tags.length > 0 || dishData.Diets.length > 0 ? (
              <>
                <Divider />
                <SectionTitle>Allergen and Diet Info</SectionTitle>
                <SectionBody>
                  {showRemovableNotice ? (
                    <RemovableNotice>
                      Dish can be modified to fit your dietary needs
                      <Dot />
                    </RemovableNotice>
                  ) : null}
                  {dishData.Tags.length > 0 ? (
                    <TagsWrapper>
                      <img src={InfoIcon} />
                      Contains{" "}
                      {dishData.Tags.map((allergen) => (
                        <TagName
                          key={allergen.id}
                          highlight={
                            allergen.DishTag.removable &&
                            context.activeFilters.allergens.has(allergen.id)
                          }
                        >
                          {allergen.name}
                        </TagName>
                      ))}
                    </TagsWrapper>
                  ) : null}
                  {/* Adding a line break between two inline-blocks */}
                  <div></div>
                  {dishData.Diets.length > 0 ? (
                    <TagsWrapper>
                      <img src={CheckMark} />
                      {dishData.Diets.map((diets) => (
                        <TagName key={diets.id}>{diets.name}</TagName>
                      ))}{" "}
                      friendly
                    </TagsWrapper>
                  ) : null}
                </SectionBody>
              </>
            ) : (
              ""
            )}
            {dishData.Modifications.length > 0 ? (
              <>
                <Divider />
                <SectionTitle>Dish Options</SectionTitle>
                <SectionBody
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  {dishData.Modifications.map((t) => (
                    <AddOn key={t.id}>
                      <label className="container">
                        <AddOnName>{t.name} </AddOnName>
                        {t.description ? (
                          <AddOnNotes> ({t.description})</AddOnNotes>
                        ) : (
                          <></>
                        )}
                        {t.price !== "0" ? (
                          <AddOnPrice> (+${t.price})</AddOnPrice>
                        ) : (
                          <></>
                        )}
                        <input
                          checked={activeModifications.some(
                            (mod) => mod.id === t.id
                          )}
                          type="checkbox"
                          onClick={() => toggleModification(t)}
                        />
                        <OptionCheckbox className="checkmark"></OptionCheckbox>
                      </label>
                    </AddOn>
                  ))}
                </SectionBody>
              </>
            ) : (
              <></>
            )}
            <SectionBody
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <QuantitySelector>
                <ChangeQuantity
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  {" "}
                  -{" "}
                </ChangeQuantity>
                <Quantity> {quantity} </Quantity>
                <ChangeQuantity onClick={() => setQuantity(quantity + 1)}>
                  {" "}
                  +{" "}
                </ChangeQuantity>
              </QuantitySelector>
              <SaveDishButton onClick={saveDish}>
                <span>{quantity > 1 ? "Save Dishes" : "Save Dish"}</span>
                <span>
                  ${dishData.price.length > 0 ? unitDishPrice * quantity : null}
                </span>
              </SaveDishButton>
            </SectionBody>
            {savedDish ? (
              <RemoveDish
                onClick={() => {
                  onDelete();
                }}
              >
                Remove dish
              </RemoveDish>
            ) : (
              ""
            )}
          </ModalBody>
        </ModalContainer>
      ) : (
        ""
      )}
    </Modal>
  );
}
