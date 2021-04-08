import React, { useState, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import TagButton from "components/TagButton";
import Counter from "components/Counter";
import styled from "styled-components";
import RestaurantContext from "../../RestaurantContext";

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
        cols.push(
          <Col key={j}>
            <div style={{ minWidth: "95px" }}></div>
          </Col>
        );
        continue;
      }
      cols.push(
        <Col key={j}>
          <GridTagButton
            selected={props.selected.has(tags[tag_keys[i + j]].id)}
            onClick={() => {
              const tag = tags[tag_keys[i + j]];
              let selected = new Set(props.selected);
              if (selected.has(tag.id)) {
                selected.delete(tag.id);
              } else {
                selected.add(tag.id);
              }
              props.onSelect({ allergens: selected });
            }}
          >
            {tags[tag_keys[i + j]].name}
          </GridTagButton>
        </Col>
      );
    }
    rows.push(
      <Row noGutters={true} key={i}>
        {cols}
      </Row>
    );
  }
  return <Grid>{rows}</Grid>;
}

function DietGrid(props) {
  const tags = props.tags;
  const tag_keys = Object.keys(tags);
  let rows = [];
  for (let i = 0; i < tag_keys.length; i += 2) {
    let cols = [];
    for (let j = 0; j < 2; ++j) {
      if (i + j >= tag_keys.length) {
        cols.push(
          <Col key={j}>
            <div style={{ minWidth: "95px" }}></div>
          </Col>
        );
        continue;
      }
      cols.push(
        <Col key={j}>
          <GridTagButton
            selected={props.selected.has(tags[tag_keys[i + j]].id)}
            onClick={() => {
              const tag = tags[tag_keys[i + j]];
              let selected = new Set(props.selected);
              if (selected.has(tag.id)) {
                selected.delete(tag.id);
              } else {
                selected.add(tag.id);
              }
              props.onSelect({ diets: selected });
            }}
          >
            {tags[tag_keys[i + j]].name}
          </GridTagButton>
        </Col>
      );
    }
    rows.push(
      <Row noGutters={true} key={i}>
        {cols}
      </Row>
    );
  }
  return <Grid>{rows}</Grid>;
}

const SaveButton = styled(Button)`
  background-color: #628deb;
  color: white;
  font-weight: bold;
  margin: 10px auto 0 auto;
  display: block;
  width: 85%;
  height: 44px;
  border-radius: 22px;
  border: none;

  &:hover {
    background-color: #a9c1f5;
    opacity: 0.8;
  }

  &:disabled {
    background-color: #a9c1f5;
    opacity: 0.8;
  }
`;

const GridHeader = styled.h3`
  position: relative;
  font-weight: bold;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  letter-spacing: 0.02em;
`;

const FilterCounterContainer = styled.div`
  position: absolute;
  width: max-content;
  min-width: 50px;
  height: 100%;
  right: 8px;
`;

export default (props) => {
  const context = useContext(RestaurantContext);

  function onExpansionChanged() {
    const expanded = props.expanded;
    props.onExpansionChanged(!expanded);
  }

  return (
    <>
      <props.StyledHeader onClick={onExpansionChanged}>
        <div className={"text"}>Filters</div>
        <FilterCounterContainer>
          <Counter
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
            active={context.activeFilters.size > 0}
          >
            {context.activeFilters.size}
          </Counter>
          <props.StyledExpandArrow pointingUp={props.expanded} />
        </FilterCounterContainer>
      </props.StyledHeader>
      {props.expanded ? (
        <props.StyledBody>
          {context.menu.hasAllergens ? (
            <>
              <GridHeader>Allergens</GridHeader>
              <TagGrid
                tags={context.menu.filters.allergens}
                selected={context.activeFilters.allergens}
                onSelect={context.setFilters}
              />
            </>
          ) : (
            ""
          )}
          {context.menu.hasDiets ? (
            <>
              <GridHeader>Diets</GridHeader>
              <DietGrid
                tags={context.menu.filters.diets}
                selected={context.activeFilters.diets}
                onSelect={context.setFilters}
              />
            </>
          ) : (
            ""
          )}
          <SaveButton
            disabled={context.activeFilters.size === 0}
            onClick={() => context.setFilters({ allergens: new Set() })}
          >
            Clear All
          </SaveButton>
        </props.StyledBody>
      ) : (
        <></>
      )}
    </>
  );
};
