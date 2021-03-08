import React, { useContext } from 'react';
import RestaurantContext from 'RestaurantContext';
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

let ExpansionArrowContainer = styled.div`
  position: absolute;
  right: 10px;
`

export default (props) => {

  const context = useContext(RestaurantContext);

  function scrollToCategory(categoryRef) {
    const scrollAmount = categoryRef.current.getBoundingClientRect().top - 50;
    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
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
        <ExpansionArrowContainer>
          <props.StyledExpandArrow
              pointingUp={props.expanded}
          />
        </ExpansionArrowContainer>
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
