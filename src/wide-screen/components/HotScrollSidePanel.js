import React from 'react';
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
  }
`;

export default class extends React.Component {

  scrollToCategory(categoryRef) {
    categoryRef.current.scrollIntoView();
  }

  onExpansionChanged() {
    const expanded = this.props.expanded;
    this.props.onExpansionChanged(!expanded);
  }

  render() {
    return (
      <>
        <this.props.StyledHeader
          onClick={this.onExpansionChanged.bind(this)}
        >
          <div>
            Menu Sections
          </div>
          <this.props.StyledExpandArrow
            pointingUp={this.props.expanded}
          />
        </this.props.StyledHeader>
        {this.props.expanded?
          <this.props.StyledBody>
            {this.props.categories.map((category, i) =>
              <CategoryTitle
                onClick={() => this.scrollToCategory(this.props.categoryToRef[category])}
                key={i}
              >
                {category}
              </CategoryTitle>
            )}
          </this.props.StyledBody>
          :
          <></>
        }
      </>
    );
  }
}
