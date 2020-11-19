import React, { useContext } from 'react';
import RestaurantContext from 'restaurant-context';
import styled from 'styled-components';

const CategoryTitle = styled.div`
  line-height: 200%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  color: #8A9DB7;

  &:hover {
    color: #000000;
    text-decoration: underline #5383EC;
    cursor: pointer;
  }
`;

export default (props) => {

  const context = useContext(RestaurantContext);

  function scrollToCategory(categoryRef) {
    categoryRef.current.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  function onExpansionChanged() {
    const expanded = props.expanded;
    props.onExpansionChanged(!expanded);
  }

  return (
    <>
      <props.StyledHeader
        onClick={onExpansionChanged}
      >
        <div className="text">
          Menu Sections
        </div>
          <props.StyledExpandArrow
            pointingUp={props.expanded}
            style={{margin: '0 25px'}}
          />
      </props.StyledHeader>
      {props.expanded?
        <props.StyledBody style={{paddingLeft: '20px'}}>
          {context.menu.categories.map((category) =>
            <CategoryTitle
              onClick={() => scrollToCategory(props.categoryToRef[category.id])}
              key={category.id}
            >
              {category.name}
            </CategoryTitle>
          )}
        </props.StyledBody>
        :
        <></>
      }
    </>
  );
}
