import React, { useContext, useEffect, useRef, useState } from "react";
import RestaurantContext from "../../RestaurantContext";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import TagButton from "components/TagButton";
import Counter from "components/Counter";
import styled from "styled-components";

const SlideUpPanelWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

const SlideUpPanel = styled.div`
  position: relative;
  z-index: 11;
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px rgba(136, 146, 158, 0.15);
`;

const CloseButton = styled.div`
  position: relative;
  margin: 20px 24px 0 24px;
  padding: 15px 0 30px 0;

  & .tray-clear-button {
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #f06441;
    box-shadow: 0px 10px 20px rgba(240, 100, 65, 0.2);
  }
`;

const RightSidePanel = styled.div`
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 150;
  right: 0;
  max-height: 100vh;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  background: #ffffff;
  overflow-y: auto;
`;

const StyledGridTagButton = styled(TagButton)`
  cursor: default;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: 0.02em;
  background-color: #f7f5f3;
  text-transform: capitalize;
  ${({ selected }) =>
    selected
      ? {
          color: "#0D5959",
          fontWeight: "bold",
          border: "2px solid #0D5959",
        }
      : {
          color: "#000000",
          fontWeight: "500",
        }}
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
  };

  return (
    <StyledGridTagButton {...props} onClick={onClick}>
      {props.filter.name}
    </StyledGridTagButton>
  );
};

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
        cols.push(
          <StyledColumn key={j}>
            <GridTagButton
              selected={activeFilters.has(filters[keys[i + j]].id)}
              filter={filters[keys[i + j]]}
              onSelect={setFilters}
              activeFilters={activeFilters}
            />
          </StyledColumn>
        );
      }
      rows.push(
        <StyledRow noGutters={true} key={i}>
          {cols}
        </StyledRow>
      );
    }
    return rows;
  };

  return <Grid>{createGrid()}</Grid>;
}

const Padded = styled.div`
  padding: 0 24px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #dce2e9;
`;

const PanelHeader = styled.div`
  position: relative;
  height: 60px;
  left: 0px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`;

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
`;

const ApplyButton = styled(PanelHeaderElement)`
  right: 0;
`;

const Title = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  display: table;
  letter-spacing: 0.02em;
  color: #000000;
  text-align: center;
  margin-top: 10px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #606060;
  margin-top: 8px;
  height: 20px;
  line-height: 20px;
  display: table;
  text-align: center;
  margin-bottom: 10px;
`;

export default ({ filterOpen, setFilterOpen, isLoadingPage }) => {
  const myRef = useRef();
  const context = useContext(RestaurantContext);

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <RightSidePanel open={filterOpen} ref={myRef}>
      <Padded>
        <PanelHeader>
          <ResetButton
            style={{
              color:
                context.activeFilters.size +
                  context.activeFilters.searchDishes.length ===
                0
                  ? "#8A9DB7"
                  : "#EF5454",
            }}
            onClick={() => {
              context.setFilters({
                allergens: new Set(),
                diets: new Set(),
                searchDishes: "",
              });
              context.activeFilters.searchDishes.length = "";
            }}
          >
            Reset
          </ResetButton>
          <FilterHeading>
            <span style={{ marginRight: "28px" }}>Filters</span>
            <Counter
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                fontSize: "14px",
              }}
              radius={"20px"}
              active={
                context.activeFilters.searchDishes.length +
                  context.activeFilters.size >
                0
              }
              activeColor={"#00807F"}
            >
              {context.activeFilters.searchDishes.length > 0
                ? context.activeFilters.size + 1
                : context.activeFilters.size}
            </Counter>
          </FilterHeading>
          <ApplyButton
            onClick={() => {
              setFilterOpen(false);
            }}
          >
            {isLoadingPage ? (
              <div
                style={{ color: "#00807F" }}
                onClick={() => {
                  setFilterOpen(false);
                }}
              >
                SKIP
              </div>
            ) : (
              <div>Done</div>
            )}
          </ApplyButton>
        </PanelHeader>
      </Padded>
      <Divider />
      <Padded>
        {!isLoadingPage ? (
          <>
            <Title style={{ marginTop: "24px" }}>Search</Title>
            <InputGroup>
              <Form.Control
                style={{
                  marginTop: "12px",
                  borderRadius: "50px",
                  backgroundColor: "#F7F5F3",
                  color: "#000000",
                  fontWeight: "bold",
                }}
                name="searchValue"
                type="text"
                placeholder="i.e. 'chicken'"
                value={context.activeFilters.searchDishes}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                  }
                }}
                onChange={(e) =>
                  context.setFilters({ searchDishes: e.target.value })
                }
              />
              <i class="fas fa-search" />
            </InputGroup>
          </>
        ) : (
          <Title style={{ width: "100%" }}>
            Do you have any diets or allergies we should know about?
          </Title>
        )}
        {isLoadingPage && (
          <Subtitle style={{ width: "100%" }}>
            If you do, choose filters below. If not, skip this step.
          </Subtitle>
        )}
        {context.menu?.hasDiets && (
          <>
            <Title style={{ marginTop: "24px" }}>Diets</Title>
            <TagGrid
              crossCount={2}
              filters={context.menu.filters.diets}
              activeFilters={context.activeFilters.diets}
              setFilters={(diets) => context.setFilters({ diets })}
            />
          </>
        )}
        {context.menu?.hasAllergens && (
          <>
            <Title style={{ marginTop: "32px" }}>Allergens</Title>
            <Subtitle>Exclude dishes that contain:</Subtitle>
            <TagGrid
              crossCount={2}
              filters={context.menu.filters.allergens}
              activeFilters={context.activeFilters.allergens}
              setFilters={(allergens) => context.setFilters({ allergens })}
            />
          </>
        )}
      </Padded>
      {isLoadingPage && (
        <SlideUpPanelWrapper>
          <SlideUpPanel>
            <CloseButton>
              <div
                className="tray-clear-button"
                onClick={() => {
                  setFilterOpen(false);
                }}
              >
                Start My Meal
              </div>
            </CloseButton>
          </SlideUpPanel>
        </SlideUpPanelWrapper>
      )}
    </RightSidePanel>
  );
};
