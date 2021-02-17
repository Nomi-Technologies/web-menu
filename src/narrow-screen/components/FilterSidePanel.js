import React, { useContext, useState, useEffect, useRef } from 'react';
import RestaurantContext from '../../RestaurantContext';
import { Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import styled from 'styled-components';

const RightSidePanel = styled.div`
  position: relative;
  z-index: 11;
  top: 0px;
  right: 15px;
`;

const PanelHeader = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const PanelHeaderElement = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
`;

const FilterLabel = styled(PanelHeaderElement)`
  margin-left: 8px;
`;

const ClearButton = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #EF5454;
  left:20px;
  position:absolute;
`;

function PanelToggle({ setFilterOpen }) {
  const context = useContext(RestaurantContext);
  return (
    <PanelHeader onClick={() => setFilterOpen(true)}>
      <FilterLabel>
        FILTERS
      </FilterLabel>
      <PanelHeaderElement>
        <Counter
          style={{ marginLeft: '5px' }}
          homeActive={context.activeFilters.size > 0}
        >
          {context.activeFilters.size}
        </Counter>
      </PanelHeaderElement>
    </PanelHeader>
  );
}

const StyledGridTagButton = styled(TagButton)`
  margin: 10px;
  cursor: default;
  color: #000000;
  font-family: HK Grotesk;
  font-style: normal;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.02em;
  
  padding-top: 6px; /* vertically center */
  background-color: ${props => props.selected ? '#00807F' : '#EBEEF5'};
`;


const GridTagButton = (props) => {
  const onClick = () => {
    let currentTags = new Set(props.currentTags);
    if (currentTags.has(props.tag.id)) { currentTags.delete(props.tag.id); }
    else { currentTags.add(props.tag.id); }
    props.onSelect({ allergens: currentTags });
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
  const tags = context.menu.filters.allergens;
  const tag_keys = Object.keys(tags);

  const createGrid = () => {
    let rows = [];
    for (let i = 0; i < tag_keys.length; i += 2) {
      let cols = [];
      for (let j = 0; j < 2; ++j) {
        if (i + j >= tag_keys.length) {
          cols.push(<Col key={j}></Col>);
          continue;
        }
        cols.push(<Col key={j}>
          <GridTagButton
            selected={context.activeFilters.allergens.has(tags[tag_keys[i + j]].id)}
            tag={tags[tag_keys[i + j]]}
            onSelect={context.setFilters}
            currentTags={context.activeFilters.allergens}
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
  position: absolute;
  top: -10px;
  right: -20px;
  width: 350px;
  height: 1500px;
  background: white;
`

const FilterHeader = styled.div`
  position: relative;
  height: 50px;
  left: 0px;
  margin-top: 20px;
  font-size: 18px;
  display: flex;
  justify-content: center;
`

const FilterButton = styled.div`
  color: black;
  position: relative;
`

const FilterDoneButton = styled.div`
  right:20px;
  position:absolute;
  color:#00807F;
`

const AllergenTitle = styled.p`
  position: relative;

  margin-left: 20px;  /* Align with Filters label */
  padding-top: 10px;  
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  color: #000000;
`

const SectionTitle = styled.p`
  margin-left: 20px;  /* Align with Filters label */
  font-family: HK Grotesk;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #606060;
`;

export default ({ filterOpen, setFilterOpen }) => {
  const myRef = useRef();
  const context = useContext(RestaurantContext);

  const handleClickOutside = e => {
      if (!myRef.current.contains(e.target)) {
          setFilterOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <RightSidePanel ref={myRef}>
      <PanelToggle
        setFilterOpen={setFilterOpen}
      />
      {filterOpen ?
      <>
          <PanelBody>
            <FilterHeader>
              <ClearButton
                style={{
                  color: context.activeFilters.size === 0 ? '#8A9DB7' : '#EF5454'
                }}
                onClick={() => context.setFilters({ allergens: new Set() })}>
                CLEAR
              </ClearButton>
              <FilterButton>
                <span style={{ marginRight: '24px'}}>FILTERS</span>
                <Counter
                  style={{ position: 'absolute', top: '0', right: '0', fontSize: '12px' }}
                  radius={'18px'}
                  active={context.activeFilters.size > 0}
                >
                  {context.activeFilters.size}
                </Counter>
              </FilterButton>
              <FilterDoneButton onClick={() => setFilterOpen(false)} >DONE</FilterDoneButton>
            </FilterHeader>
            <AllergenTitle>Allergens</AllergenTitle>
            <SectionTitle>Exclude dishes that contain:</SectionTitle>
            <TagGrid />
          </PanelBody>
      </>
        :
        <></>
      }
    </RightSidePanel>
  );
}
