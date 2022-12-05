import React, { useContext, useState, useEffect, useRef } from "react";
import RestaurantContext from "../../RestaurantContext";
import DishInfoModal from "components/DishInfoModal";
import Counter from "components/Counter";
import ExpansionArrow from "components/ExpansionArrow";
import styled from "styled-components";
import Swipeout from "@gem-mine/rc-swipeout";
import "@gem-mine/rc-swipeout/assets/index.css";
import DeleteIcon from "components/DeleteX.png";

const SlideUpPanel = styled.div`
  position: relative;
  z-index: 11;
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px rgba(136, 146, 158, 0.15);
`;

const PanelHeader = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const PanelHeaderElement = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  height: 100%;
`;

const FilterLabel = styled(PanelHeaderElement)`
  font-size: 16px;
  margin-left: 24px;
`;

const Spacer = styled(PanelHeaderElement)`
  flex: 1 1 auto;
`;

const StyledExpansionArrow = styled(ExpansionArrow)`
  margin: 0 25px;
`;

function SlideUpPanelHeader(props) {
  return (
    <PanelHeader>
      <FilterLabel onClick={props.onExpansionChanged}>My Dishes</FilterLabel>
      <PanelHeaderElement>
        <Counter
          style={{ marginLeft: "10px" }}
          onClick={props.onExpansionChanged}
          active={props.count > 0}
          activeColor={"#F06441"}
        >
          {props.count}
        </Counter>
      </PanelHeaderElement>
      <Spacer onClick={props.onExpansionChanged} />
      <PanelHeaderElement>
        <StyledExpansionArrow
          onClick={props.onExpansionChanged}
          pointingUp={!props.expanded ? 1 : 0}
        />
      </PanelHeaderElement>
    </PanelHeader>
  );
}

const PanelBody = styled.div`
  max-height: 600px;
  width: 100%;
  padding-bottom: 20px;
`;

const DishEntry = styled.div`
  display: flex;
  padding: 16px 24px;
  font-size: 14px;
  flex-direction: row;
`;

const ItemCount = styled.div`
  flex: 0 1 30px;
  position: relative;
`;

const DishInfo = styled.div`
  flex: 1 1 auto;
`;

const EditButton = styled.div`
  position: relative;
  flex: 0 1 65px;
  cursor: pointer;
  text-align: center;
  color: #0d5959;
  font-weight: 500;

  & span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
`;

const Notice = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 10px 24px 16px 24px;
`;

const NoDishNotice = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const ActionButton = styled.div`
  position: relative;
  margin: 20px 24px 0 24px;

  & .tray-clear-button {
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-radius: 24px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #f06441;
  }
`;

const ClearButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #f8b2a0;
  text-align: center;
  padding: 18px 0 5px 0;
`;

function SlideUpPanelBody({ dishes, onFinish }) {
  const { dishesById, setSavedDishes } = useContext(RestaurantContext);
  const { savedDishes } = useContext(RestaurantContext);

  const [index, setIndex] = useState();
  const [showModal, setShowModal] = useState(false);

  const onDelete = (index) => {
    const savedDishes = [...dishes];
    savedDishes.splice(index, 1);
    setSavedDishes(savedDishes);
    setIndex();
  };

  const onClearTray = () => {
    setSavedDishes([]);
    setIndex();
  };

  return (
    <>
      <PanelBody>
        {dishes.length > 0 ? (
          <>
            <Notice>Ready to order? Call your waiter over.</Notice>
            {dishes.map(({ quantity, id, modIds }, index) => {
              // Getting actual dish data
              const dish = dishesById[id];
              return (
                <Swipeout
                  key={index}
                  right={[
                    {
                      text: <img src={DeleteIcon} />,
                      onPress: () => onDelete(index),
                      style: { backgroundColor: "red", width: "60px" },
                    },
                  ]}
                  autoClose={() => true}
                >
                  <DishEntry>
                    <ItemCount>
                      <Counter
                        radius={"20px"}
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translate(0, -50%)",
                          backgroundColor: "#0D5959",
                          fontWeight: "bold",
                          fontSize: "10px",
                        }}
                      >
                        {quantity}
                      </Counter>
                    </ItemCount>
                    <DishInfo>
                      <div style={{ fontWeight: "bold" }}>{dish.name}</div>
                      {modIds.map((id, index) => {
                        const mod = dish.Modifications.find(
                          (mod) => mod.id === id
                        );
                        return (
                          <div key={index} style={{ marginTop: "5px" }}>
                            {mod.name}
                          </div>
                        );
                      })}
                    </DishInfo>
                    <EditButton
                      onClick={() => {
                        setIndex(index);
                        setShowModal(true);
                      }}
                    >
                      <span>edit</span>
                    </EditButton>
                  </DishEntry>
                </Swipeout>
              );
            })}
          </>
        ) : (
          <NoDishNotice>Your saved items will show up here</NoDishNotice>
        )}
        <ActionButton>
          <div className="tray-clear-button" onClick={onFinish}>
            Finish Meal
          </div>
        </ActionButton>
        <ClearButton onClick={onClearTray}>Clear All Items</ClearButton>
      </PanelBody>

      {typeof index !== "undefined" ? (
        <DishInfoModal
          index={index}
          show={showModal}
          onHide={() => setShowModal(false)}
          dishes={savedDishes}
        />
      ) : null}
    </>
  );
}

export default ({ setFinished }) => {
  const { savedDishes } = useContext(RestaurantContext);
  const [panelExpanded, setPanelExpanded] = useState(false);

  function onExpansionChanged() {
    setPanelExpanded(!panelExpanded);
  }

  return (
    <SlideUpPanel>
      <SlideUpPanelHeader
        count={savedDishes.length}
        onExpansionChanged={onExpansionChanged}
        expanded={panelExpanded}
      />
      {panelExpanded ? (
        <SlideUpPanelBody
          dishes={savedDishes}
          onFinish={() => setFinished(true)}
        />
      ) : (
        <></>
      )}
    </SlideUpPanel>
  );
};
