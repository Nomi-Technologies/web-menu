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
    cursor: pointer;
  }
`;

export default class extends React.Component {

  scrollToCategory(categoryRef) {
    categoryRef.current.scrollIntoView({ 
      behavior: 'smooth' 
    });
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
          <div className="text">
            Menu Sections
          </div>
            <this.props.StyledExpandArrow
              pointingUp={this.props.expanded}
              style={{margin: '0 25px'}}
            />
        </this.props.StyledHeader>
        {this.props.expanded?
          <this.props.StyledBody style={{paddingLeft: '20px'}}>
            {this.props.categories.map((category) =>
              <CategoryTitle
                onClick={() => this.scrollToCategory(this.props.categoryToRef[category.id])}
                key={category.id}
              >
                {category.name}
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
