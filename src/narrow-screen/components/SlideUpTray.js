import React, { useContext, useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import RestaurantContext from '../../RestaurantContext';
import DishInfoModal from 'components/DishInfoModal';
import Counter from 'components/Counter';
import ExpansionArrow from 'components/ExpansionArrow';
import styled from 'styled-components';
import Swipeout from '@gem-mine/rc-swipeout';
import '@gem-mine/rc-swipeout/assets/index.css';
import DeleteIcon from 'components/Delete.png';

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
  margin-left: 20px;
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
      <FilterLabel onClick={props.onExpansionChanged}>
        My Dishes
      </FilterLabel>
      <PanelHeaderElement>
        <Counter
          style={{ marginLeft: '10px' }}
          onClick={props.onExpansionChanged}
          active={props.count > 0}
          activeColor={'#F06441'}
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
  padding: 20px;
  font-size: 14px;
  flex-direction: row;
`;

const ItemCount = styled.div`
  flex: 0 1 40px;
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
  color: #00807f;

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
  margin: 0 20px 10px 20px;
`;

const NoDishNotice = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const ClearButton = styled.div`
  position: relative;
  height: 44px;
  margin-top: 20px;

  & button {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 300px;
    height: 44px;
    border-radius: 22px;
    font-size: 18px;
    font-weight: bold;
    background-color: #F06441;
    color: white;

    :disabled {
      background-color: #F8B2A0;
    }
  }
`;

function SlideUpPanelBody({ dishes }) {
  const { dishesById, setSavedDishes } = useContext(RestaurantContext);

  const [index, setIndex] = useState();
  const [showModal, setShowModal] = useState(false);

  const onDelete = (index) => {
    const savedDishes = [...dishes];
    savedDishes.splice(index, 1);
    setSavedDishes(savedDishes);
    if (savedDishes.length === 0) {
      setIndex();
    }
  }

  const onClearTray = () => {
    setSavedDishes([]);
    setIndex();
  }

  return <>
    <PanelBody>
      {
        dishes.length > 0 ?
        <>
          <Notice>Ready to order? Call your waiter over.</Notice>
          {
            dishes.map(({ quantity, id, modIds }, index) => {
              // Getting actual dish data
              const dish = dishesById[id];
              return <Swipeout
                key={index}
                right={[{
                  text: <img src={DeleteIcon} />,
                  onPress: () => onDelete(index),
                  style: { backgroundColor: 'red', width: '60px' },
                }]}
              >
                <DishEntry>
                  <ItemCount>
                    <Counter
                      radius={'20px'}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translate(0, -50%)',
                        backgroundColor: 'black',
                        fontWeight: 'bold',
                        fontSize: '10px',
                      }}
                    >
                      {quantity}
                    </Counter>
                  </ItemCount>
                  <DishInfo>
                    <div style={{ fontWeight: 'bold' }}>
                      {dish.name}
                    </div>
                    {
                      modIds.map((id, index) => {
                        const mod = dish.Modifications.find((mod) => mod.id === id);
                        return <div
                          key={index}
                          style={{marginTop: '5px'}}
                        >{mod.name}</div>;
                      })
                    }
                  </DishInfo>
                  <EditButton
                    onClick={() => {
                      setIndex(index);
                      setShowModal(true);
                    }}
                  ><span>edit</span></EditButton>
                </DishEntry>
              </Swipeout>;
            })
          }
        </>
        :
        <NoDishNotice>Your saved items will show up here</NoDishNotice>
      }
      <ClearButton>
        <Button
          disabled={dishes.length === 0}
          onClick={onClearTray}
        >
          Clear all items
        </Button>
      </ClearButton>
    </PanelBody>

    {
      typeof index !== 'undefined' ? 
      <DishInfoModal
        index={index}
        show={showModal}
        onHide={() => setShowModal(false)}
      /> : null
    }
  </>
}

export default () => {
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
      {panelExpanded ?
        <SlideUpPanelBody dishes={savedDishes} />
        :
        <></>
      }
    </SlideUpPanel>
  );
}
