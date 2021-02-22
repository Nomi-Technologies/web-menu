import React, { useContext, useEffect, useRef } from 'react';
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
`;

const StyledGridTagButton = styled(TagButton)`
  cursor: default;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: 0.02em;
  background-color: #EBEEF5;
  text-transform: capitalize;
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
    let activeFilters = new Set(props.activeFilters);
    if (activeFilters.has(props.filter.id)) {
      activeFilters.delete(props.filter.id);
    } else {
      activeFilters.add(props.filter.id);
    }
    props.onSelect(activeFilters);
  }

  return (
    <StyledGridTagButton {...props} onClick={onClick}>
      { props.filter.name }
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

function TagGrid({ crossCount, filters, activeFilters, setFilters }) {
  const keys = Object.keys(filters);

  const createGrid = () => {
    let rows = [];
    for (let i = 0; i < keys.length; i += crossCount) {
      let cols = [];
      for (let j = 0; j < crossCount; ++j) {
        if (i + j >= keys.length) {
          cols.push(<StyledColumn key={j}></StyledColumn>);
          continue;
        }
        cols.push(<StyledColumn key={j}>
          <GridTagButton
            selected={activeFilters.has(filters[keys[i + j]].id)}
            filter={filters[keys[i + j]]}
            onSelect={setFilters}
            activeFilters={activeFilters}
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

const Padded = styled.div`
  padding: 0 24px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #DCE2E9;
`;

const PanelHeader = styled.div`
  position: relative;
  height: 60px;
  left: 0px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`

const PanelHeaderElement = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  letter-spacing: 0.02em;
`;

const ResetButton = styled(PanelHeaderElement)`
  position: absolute;
  left: 0;
`;

const FilterHeading = styled(PanelHeaderElement)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  line-height: 20px;
`

const ApplyButton = styled(PanelHeaderElement)`
  right: 0;
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
      <Padded>
        <PanelHeader>
          <ResetButton
            style={{
              color: context.activeFilters.size === 0 ? '#8A9DB7' : '#EF5454'
            }}
            onClick={() => context.setFilters({
              allergens: new Set(),
              diets: new Set()
            })}
          >
            Reset
          </ResetButton>
          <FilterHeading>
            <span style={{ marginRight: '28px'}}>Filters</span>
            <Counter
              style={{ position: 'absolute', top: '0', right: '0', fontSize: '14px' }}
              radius={'20px'}
              active={context.activeFilters.size > 0}
              activeColor={'#00807F'}
            >
              {context.activeFilters.size}
            </Counter>
          </FilterHeading>
          <ApplyButton onClick={() => setFilterOpen(false)} >Apply</ApplyButton>
        </PanelHeader>
      </Padded>
      <Divider />
      <Padded>
        <Title style={{ marginTop: '24px' }}>Diets</Title>
        <TagGrid
          crossCount={1}
          filters={context.menu.filters.diets}
          activeFilters={context.activeFilters.diets}
          setFilters={(diets) => context.setFilters({ diets })}
          />
        <Title style={{ marginTop: '32px' }}>Allergens</Title>
        <Subtitle>Exclude dishes that contain:</Subtitle>
        <TagGrid
          crossCount={2}
          filters={context.menu.filters.allergens}
          activeFilters={context.activeFilters.allergens}
          setFilters={(allergens) => context.setFilters({ allergens })}
        />
      </Padded>
    </RightSidePanel>
  );
}
