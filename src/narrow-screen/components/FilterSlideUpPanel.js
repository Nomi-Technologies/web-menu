import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TagButton from 'components/TagButton';
import Counter from 'components/Counter';
import ExpansionArrow from 'components/ExpansionArrow';
import styled from 'styled-components';

const SlideUpPanel = styled.div`
  position: relative;
  z-index: 11;
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px rgba(136, 146, 158, 0.15);
  
`;

const PanelHeader = styled.div`
  height: 80px;
  width: 100%;
  position: relative;
  line-height: 80px; /* vertically center stuff */
  display: flex;
  flex-direction: row;
`;

const PanelHeaderElement = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
`;

const FilterLabel = styled(PanelHeaderElement)`
  margin-left: 38px;
`;

const Spacer = styled(PanelHeaderElement)`
  flex: 1 1 auto;
`;

const ClearButton = styled(Button)`
  width: 96px;
  height: 44px;
  font-weight: 700;
  font-size: 18px;
  border-radius: 22px;
  z-index: 25;
  border: none;
  
  &:disabled {
    background: #628DEB;
    opacity: 0.5;
  }
`;

const StyledExpansionArrow = styled(ExpansionArrow)`
  margin: 0 25px;
`;

function SlideUpPanelHeader(props) {
  return (
    <PanelHeader>
      <FilterLabel onClick={props.onExpansionChanged}>
        Filters
      </FilterLabel>
      <PanelHeaderElement>
        <Counter
          onClick={props.onExpansionChanged}
          active={props.selected.size > 0}
        >
          {props.selected.size}
        </Counter>
      </PanelHeaderElement>
      <Spacer onClick={props.onExpansionChanged} />
      <PanelHeaderElement>
        <ClearButton
          variant='primary'
          disabled={props.selected.size === 0}
          onClick={props.onClearFilter}
        >
          Clear
        </ClearButton>
      </PanelHeaderElement>
      <PanelHeaderElement>
        <StyledExpansionArrow
          onClick={props.onExpansionChanged}
          pointingUp={!props.expanded ? 1 : 0}
        />
      </PanelHeaderElement>
    </PanelHeader>
  );
}

const StyledGridTagButton = styled(TagButton)`
  margin: 10px;
  cursor: default;
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
  const tags = props.tags;
  const tag_keys = Object.keys(tags);

  const createGrid = () => {
    let rows = [];
    for (let i = 0; i < tag_keys.length; i += 3) {
      let cols = [];
      for (let j = 0; j < 3; ++j) {
        if (i + j >= tag_keys.length) {
          cols.push(<Col key={j}></Col>);
          continue;
        }
        cols.push(<Col key={j}>
          <GridTagButton
            selected={props.selected.has(tags[tag_keys[i + j]].id)}
            tag={tags[tag_keys[i + j]]}
            onSelect={props.onSelect}
            currentTags={props.selected}
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

const PanelBody = styled.div`
  max-height: 600px;
  width: 100%;
  padding: 10px 15px 20px 15px;
`;

const SectionTitle = styled.i`
  margin-left: 23px;  /* Align with Filters label */
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #8A9DB7;
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

function SlideUpPanelBody(props) {
  return (
    <PanelBody>
      <SectionTitle>Exclude dishes that contain:</SectionTitle>
      <TagGrid {...props} />
    </PanelBody>
  )
}

export default class extends React.Component {

  state = {
    selected: new Set(),
  };

  onExpansionChanged() {
    const expanded = this.props.expanded;
    this.props.onExpansionChanged(!expanded);
  }

  onApplyFilter(selected) {
    this.props.onApplyFilter(selected, false);
  }

  onClearFilter() {
    this.setState({ selected: new Set() });
    this.props.onClearFilter();
  }

  onSelect(selected) {
    this.setState({ selected: selected });
    this.onApplyFilter(selected)
  }

  render() {
    return (
      <SlideUpPanel>
        <SlideUpPanelHeader
          onExpansionChanged={this.onExpansionChanged.bind(this)}
          onClearFilter={this.onClearFilter.bind(this)}
          expanded={this.props.expanded}
          selected={this.state.selected}
        />
        {this.props.expanded ?
          <SlideUpPanelBody
            tags={this.props.tags}
            selected={this.state.selected}
            onSelect={this.onSelect.bind(this)}
            onApplyFilter={this.onApplyFilter.bind(this)}
          />
          :
          <></>
        }
      </SlideUpPanel>
    );
  }
}
