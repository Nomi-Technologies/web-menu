import React, { useState, useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import styled from 'styled-components';
import RestaurantContext from '../../restaurant-context';

const GridTagButton = styled(TagButton)`
  margin: 10px;
  min-width: 75px;
  cursor: pointer;
`;

const Grid = styled(Container)`
  margin-bottom: 20px;
  padding: 0;
`;

function TagGrid(props) {
  const tags = props.tags;
  const tag_keys = Object.keys(tags);
  let rows = [];
  for (let i = 0; i < tag_keys.length; i += 2) {
    let cols = [];
    for (let j = 0; j < 2; ++j) {
      if (i + j >= tag_keys.length) {
        cols.push(<Col key={j}><div style={{minWidth: "95px"}}></div></Col>);
        continue;
      }
      cols.push(<Col key={j}>
        <GridTagButton
          selected={props.selected.has(tags[tag_keys[i+j]].id)}
          onClick={() => {
            const tag = tags[tag_keys[i+j]];
            let selected = new Set(props.selected);
            if (selected.has(tag.id)) { selected.delete(tag.id); }
            else { selected.add(tag.id); }
            props.onSelect(selected);
          }}
        >
          {tags[tag_keys[i+j]].name}
        </GridTagButton>
      </Col>);
    }
    rows.push(<Row noGutters={true} key={i}>{cols}</Row>);
  }
  return (
    <Grid>{rows}</Grid>
  );
}

const SaveButton = styled(Button)`
  background-color: #628DEB;
  color: white;
  font-weight: bold;
  margin: 10px auto 0 auto;
  display: block;
  width: 85%;
  height: 44px;
  border-radius: 22px;
  border: none;

  &:hover {
    background-color: #A9C1F5;
    opacity: 0.8;
  }

  &:disabled {
    background-color: #A9C1F5;
    opacity: 0.8;
  }
`;

export default (props) => {

  const context = useContext(RestaurantContext);

  function onExpansionChanged() {
    const expanded = props.expanded;
    props.onExpansionChanged(!expanded);
  }

  function onClearFilter() {
    context.setFilters(new Set());
  }

  return (
    <>
      <props.StyledHeader
        onClick={onExpansionChanged}
      >
        <div className={'text'}>
          Allergen Filters
        </div>
        <div style={{
          position: 'absolute', 
          right: '0px',
          width: 'max-content',
          margin: '0 25px',
          minWidth: '50px',
        }}>
          <Counter
            active={context.activeFilters.size > 0}
          >
            {context.activeFilters.size}
          </Counter>
          <props.StyledExpandArrow
            pointingUp={props.expanded}
          />
        </div>
      </props.StyledHeader>
      {props.expanded?
        <props.StyledBody>
          <TagGrid
            tags={context.menu.tags}
            selected={context.activeFilters}
            onSelect={context.setFilters}
          />
          <SaveButton
            disabled={context.activeFilters.size === 0}
            onClick={onClearFilter}
          >
            Clear All
          </SaveButton>
        </props.StyledBody>
        :
        <></>
      }
    </>
  );
}
