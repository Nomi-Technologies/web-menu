import React, { useContext, useState, useEffect, useRef } from 'react';
import RestaurantContext from '../../RestaurantContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import ExpansionArrow from 'components/ExpansionArrow';
import styled from 'styled-components';

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
  const context = useContext(RestaurantContext);
  return (
    <PanelHeader>
      <FilterLabel onClick={props.onExpansionChanged}>
        My Dishes
      </FilterLabel>
      <PanelHeaderElement>
        <Counter
          onClick={props.onExpansionChanged}
          active={context.activeFilters.size > 0}
        >
          {context.activeFilters.size}
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

const StyledGridTagButton = styled(TagButton)`
  margin: 10px;
  cursor: default;
`;


const GridTagButton = (props) => {
  const onClick = () => {
    let currentTags = new Set(props.currentTags);
    if (currentTags.has(props.tag.id)) { currentTags.delete(props.tag.id); }
    else { currentTags.add(props.tag.id); }
    props.onSelect(currentTags);
  }

  return (
    <StyledGridTagButton {...props} onClick={onClick}>
      { props.tag.name}
    </StyledGridTagButton>
  )

}


const Grid = styled(Container)`
  margin-bottom: 20px;
  padding: 0;
`;

function TagGrid(props) {
  const context = useContext(RestaurantContext);

  const tags = context.menu.tags;
  const tag_keys = Object.keys(tags);

  const createGrid = () => {
    let rows = [];
    for (let i = 0; i < tag_keys.length; i += 3) {
      let cols = [];
      for (let j = 0; j < 3; ++j) {
        if (i + j >= tag_keys.length) {
          cols.push(<Col key={j}></Col>);
          continue;
        }
        cols.push(<Col key={j}>
          <GridTagButton
            selected={context.activeFilters.has(tags[tag_keys[i + j]].id)}
            tag={tags[tag_keys[i + j]]}
            onSelect={context.setFilters}
            currentTags={context.activeFilters}
          />

        </Col>);
      }
      rows.push(<Row noGutters={true} key={i}>{cols}</Row>);
    }
    return rows
  }

  return (
    <Grid>{createGrid()}</Grid>
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

function SlideUpPanelBody() {
  return (
    <PanelBody>
    </PanelBody>
  )
}

export default () => {
  const [panelExpanded, setPanelExpanded] = useState(false);

  function onExpansionChanged() {
    setPanelExpanded(!panelExpanded);
  }

  return (
    <SlideUpPanel>
      <SlideUpPanelHeader
        onExpansionChanged={onExpansionChanged}
        expanded={panelExpanded}
      />
      {panelExpanded ?
        <SlideUpPanelBody />
        :
        <></>
      }
    </SlideUpPanel>
  );
}
