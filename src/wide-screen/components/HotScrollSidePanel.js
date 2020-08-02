import React from 'react';
import { ReactComponent as ExpandArrow } from '../../components/expand_arrow.svg';
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
    console.log(categoryRef.current.scrollTop);
  }

  onExpansionChanged() {
    const expanded = this.props.expanded;
    this.props.onExpansionChanged(!expanded);
  }

  render() {
    return (
      <>
        <this.props.StyledHeader>
          <div
            onClick={this.onExpansionChanged.bind(this)}
          >
            Menu Sections
          </div>
          <this.props.StyledExpandArrow
            expanded={this.props.expanded}
            onClick={this.onExpansionChanged.bind(this)}
          >
            <ExpandArrow/>
          </this.props.StyledExpandArrow>
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
