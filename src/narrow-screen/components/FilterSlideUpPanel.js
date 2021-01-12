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
  // background-color: yellow;
  top: 0px;
  right: 0px;
`;

const PanelHeader = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
  
  //line-height: 80px; /* vertically center stuff */
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

const Spacer = styled(PanelHeaderElement)`
  flex: 1 1 auto;
`;

const ClearButton = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #EF5454;
  left:20px;
  position:absolute;
`;

const StyledExpansionArrow = styled(ExpansionArrow)`
  margin: 0 25px;
`;

function SlideUpPanelHeader(props) {
  const context = useContext(RestaurantContext);
  return (
    <PanelHeader>
      <FilterLabel onClick={props.onExpansionChanged}>
        FILTERS
      </FilterLabel>
      <PanelHeaderElement>
        <Counter
          onClick={props.onExpansionChanged}
          homeActive={context.activeFilters.size > 0}
        >
          {context.activeFilters.size}
        </Counter>
      {/* </PanelHeaderElement> 
      <Spacer onClick={props.onExpansionChanged} />
      <PanelHeaderElement> */}
  

        {/* <ClearButton
          variant='primary'
          disabled={context.activeFilters.size === 0}
          onClick={() => context.setFilters(new Set())}
        >
          Clear
        </ClearButton> */}
      
      </PanelHeaderElement>
      {/* <PanelHeaderElement>
        <StyledExpansionArrow
          onClick={props.onExpansionChanged}
          pointingUp={!props.expanded ? 1 : 0}
        />
      </PanelHeaderElement> */}
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
    for (let i = 0; i < tag_keys.length; i += 2) {
      let cols = [];
      for (let j = 0; j < 2; ++j) {
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

// const GreyOutBackground = styled.div`
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 800px;
//   height: 100%;
//   background-color: rgba(10, 10, 10, 0.5);
//   // z-index: 100;
// `

const PanelBody = styled.div`
  position: absolute;
  top: -10px;
  right: -20px;
  width: 300px;
  height: 1500px;
  // overflow-y: scroll;
  background: white;

  // border: 2px solid pink;
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

const FilterButton = styled.p`
  color: black;
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

// function SlideUpPanelBody(props) {
//   const context = useContext(RestaurantContext);

//   return (
//     <PanelBody>
//       <FilterHeader>
//         <ClearButton
//           style={{
//             color: context.activeFilters.size === 0 ? '#8A9DB7' : '#EF5454'
//           }}
//           onClick={() => context.setFilters(new Set())}>
//           CLEAR
//         </ClearButton>

//         <FilterButton>
//           FILTERS 
//           <Counter onClick={props.onExpansionChanged} active={context.activeFilters.size > 0}>
//             {context.activeFilters.size}
//           </Counter>
//         </FilterButton>
//         <FilterDoneButton>DONE</FilterDoneButton>
//        </FilterHeader>
//       <AllergenTitle>Allergens</AllergenTitle>
//       <SectionTitle>Exclude dishes that contain:</SectionTitle>
//       <TagGrid />
//     </PanelBody>
//   )
// }

export default (props) => {
  const [panelExpanded, setPanelExpanded] = useState(false);
  const myRef = useRef();
  const context = useContext(RestaurantContext);

  const handleClickOutside = e => {
      if (!myRef.current.contains(e.target)) {
          setPanelExpanded(false);
          // props.onClose();
      }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  function onExpansionChanged() {
    setPanelExpanded(!panelExpanded);
  }

  return (
    <SlideUpPanel ref={myRef}>
      <SlideUpPanelHeader
        onExpansionChanged={onExpansionChanged}
        expanded={panelExpanded}
      />
      {panelExpanded ?
      <>
          <PanelBody>
            <FilterHeader>
              <ClearButton
                style={{
                  color: context.activeFilters.size === 0 ? '#8A9DB7' : '#EF5454'
                }}
                onClick={() => context.setFilters(new Set())}>
                CLEAR
              </ClearButton>
      
              <FilterButton>
                FILTERS 
                <Counter onClick={props.onExpansionChanged} active={context.activeFilters.size > 0}>
                  {context.activeFilters.size}
                </Counter>
              </FilterButton>
              <FilterDoneButton onClick={() => {onExpansionChanged(); /*props.onClose();*/ console.log("filter done button")}} >DONE</FilterDoneButton>
            </FilterHeader>
            <AllergenTitle>Allergens</AllergenTitle>
            <SectionTitle>Exclude dishes that contain:</SectionTitle>
            <TagGrid />
          </PanelBody>
      </>
        :
        <></>
      }
    </SlideUpPanel>
  );
}
