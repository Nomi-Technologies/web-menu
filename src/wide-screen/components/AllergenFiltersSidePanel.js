import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import styled from 'styled-components';

const GridTagButton = styled(TagButton)`
  margin: 10px;
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
        cols.push(<Col key={j}></Col>);
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
            props.onApplyFilter();
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
  background-color: #F3A35C;
  color: white;
  font-weight: bold;
  margin: 10px auto 0 auto;
  display: block;
  width: 85%;
  height: 44px;
  border-radius: 22px;
`;

export default class AllergenFiltersSidePanel extends React.Component {

  state = {
    selected: new Set(),
  };

  onExpansionChanged() {
    const expanded = this.props.expanded;
    this.props.onExpansionChanged(!expanded);
  }

  onApplyFilter() {
    this.props.onApplyFilter(this.state.selected, false);
  }

  onClearFilter() {
    this.setState({ selected: new Set() });
    this.props.onClearFilter();
  }

  onSelect(selected) {
    this.setState({ selected: selected });
  }

  render() {
    return (
      <>
        <this.props.StyledHeader>
          <div onClick={this.onExpansionChanged.bind(this)}>
            Allergen Filters
          </div>
          <div>
            <Counter
              onClick={this.onExpansionChanged.bind(this)}
              active={this.state.selected.size > 0}
            >
              {this.state.selected.size}
            </Counter>
          </div>
          <this.props.StyledExpandArrow
            pointingUp={this.props.expanded}
            onClick={this.onExpansionChanged.bind(this)}
          />
        </this.props.StyledHeader>
        {this.props.expanded?
          <this.props.StyledBody>
            <TagGrid
              tags={this.props.tags}
              selected={this.state.selected}
              onSelect={this.onSelect.bind(this)}
              onApplyFilter={this.onApplyFilter.bind(this)}
            />
            <SaveButton
              disabled={this.state.selected.size === 0}
              onClick={this.onClearFilter.bind(this)}
            >
              Clear All
            </SaveButton>
          </this.props.StyledBody>
          :
          <></>
        }
      </>
    );
  }
}
