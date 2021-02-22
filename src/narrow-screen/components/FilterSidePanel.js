import React, { useContext, useState, useEffect, useRef } from 'react';
import RestaurantContext from '../../RestaurantContext';
import { Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import styled from 'styled-components';

const RightSidePanel = styled.div`
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(100%)'};
  position: fixed;
  z-index: 150;
  top: 0;
  right: 0;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  min-width: 320px;
  @media (max-width: 320px) {
    width: 100%;
  }
  background: #FFFFFF;
  padding: 0 24px;
`;

const ClearButton = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #EF5454;
  left:20px;
  position:absolute;
`;

const StyledGridTagButton = styled(TagButton)`
  cursor: default;
  font-family: HK Grotesk;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: 0.02em;
  background-color: #EBEEF5;
  ${({ selected }) => (selected ? {
    color: '#0D5959',
    fontWeight: 'bold',
    border: '2px solid #0D5959',
  } : {
    color: '#000000',
    fontWeight: '500',
  })}
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
  margin-top: 16px;
  padding: 0;
`;

const StyledColumn = styled(Col)`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const StyledRow = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

function TagGrid({ crossCount }) {
  const context = useContext(RestaurantContext);
  const tags = context.menu.filters.allergens;
  const tag_keys = Object.keys(tags);

  const createGrid = () => {
    let rows = [];
    for (let i = 0; i < tag_keys.length; i += crossCount) {
      let cols = [];
      for (let j = 0; j < crossCount; ++j) {
        if (i + j >= tag_keys.length) {
          cols.push(<StyledColumn key={j}></StyledColumn>);
          continue;
        }
        cols.push(<StyledColumn key={j}>
          <GridTagButton
            selected={context.activeFilters.allergens.has(tags[tag_keys[i + j]].id)}
            tag={tags[tag_keys[i + j]]}
            onSelect={context.setFilters}
            currentTags={context.activeFilters.allergens}
          />

        </StyledColumn>);
      }
      rows.push(<StyledRow noGutters={true} key={i}>{cols}</StyledRow>);
    }
    return rows
  }

  return (
    <Grid>{createGrid()}</Grid>
  );
}

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

const Title = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 16px;
  height: 24px;
  line-height: 24px;

  letter-spacing: 0.02em;
  color: #000000;
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #606060;
  margin-top: 8px;
  height: 20px;
  line-height: 20px;
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
    <RightSidePanel
      open={filterOpen}
      ref={myRef}
    >
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
      <Title>Allergens</Title>
      <Subtitle>Exclude dishes that contain:</Subtitle>
      <TagGrid crossCount={2}/>
    </RightSidePanel>
  );
}
