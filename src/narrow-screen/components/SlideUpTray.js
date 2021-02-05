import React, { useContext, useState, useEffect, useRef } from 'react';
import RestaurantContext from '../../RestaurantContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Counter from 'components/Counter';
import ExpansionArrow from 'components/ExpansionArrow';
import styled from 'styled-components';
import { getSavedDishes } from 'utils';

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
          onClick={props.onExpansionChanged}
          active={props.count > 0}
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
  padding: 10px 15px 20px 15px;
`;

const SectionTitle = styled.i`
  margin-left: 23px;  /* Align with Filters label */
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #8A9DB7;
`;

const SaveButton = styled(Button)`
  background-color: #F3A35C;
  color: white;
  font-weight: bold;
  margin: 10px auto 0 auto;
  display: block;
  width: 85%;
  height: 44px;
  border-radius: 22px;

  &:hover { 
    background-color: #F3A35C;
    opacity: 0.8;
    color: white;
  }

  &:active {
    background-color: #F3A35C;
    opacity: 0.8;
    color: white;
  }

  &:disabled {
    background-color: #F3A35C;
    opacity: 0.5;
    color: white;
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
            dishes.map(([quantity, id, mods]) => JSON.stringify([quantity, id, mods]))
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
