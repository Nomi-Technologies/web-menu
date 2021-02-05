import React, { useContext, useState, useEffect, useRef } from 'react';
import RestaurantContext from '../../RestaurantContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
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
  height: 80px;
  width: 100%;
  position: relative;
  line-height: 80px; /* vertically center stuff */
  display: flex;
  flex-direction: row;
`;

const PanelHeaderElement = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
`;

const FilterLabel = styled(PanelHeaderElement)`
  margin-left: 38px;
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
          style={{ marginLeft: '5px' }}
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
`;

const DishEntry = styled.div`
  display: flex;
  padding: 20px;
  font-size: 14px;
  flex-direction: row;
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

function SlideUpPanelBody({ dishes }) {
  const { dishesById } = useContext(RestaurantContext);

  return (
    <PanelBody>
      {
        dishes.length > 0 ?
        <>
          {
            dishes.map(([quantity, id, modIds], index) => {
              const dish = dishesById[id];
              return <Swipeout
                key={index}
                right={[{
                  text: <img src={DeleteIcon} />,
                  onPress: () => {},
                  style: { backgroundColor: 'red', width: '60px' },
                }]}
              >
                <DishEntry>
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
                    onClick={() => console.log('Editing...')}
                  ><span>edit</span></EditButton>
                </DishEntry>
              </Swipeout>;
            })
          }
        </>
        :
        <span>Your saved items will show up here</span>
      }
    </PanelBody>
  )
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
