import React from 'react';
import './AllergenFiltersSidePanel.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as ExpandArrow } from '../../components/expand_arrow.svg';
import TagButton from '../../components/TagButton';

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

  genGrid() {
    const tags = this.props.tags;
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
          <TagButton
            className='tagbtn-in-grid'
            selected={this.state.selected.has(tags[tag_keys[i+j]].id)}
            onClick={() => {
              const tag = tags[tag_keys[i+j]];
              let selected = this.state.selected;
              if (selected.has(tag.id)) {
                selected.delete(tag.id);
              } else {
                selected.add(tag.id);
              }
              this.setState({ selected: selected });
              this.onApplyFilter();
            }}
          >
            {tags[tag_keys[i+j]].name}
          </TagButton>
        </Col>);
      }
      rows.push(<Row noGutters={true} key={i}>{cols}</Row>);
    }
    return (
      <div className='grid-container'><Container>{rows}</Container></div>
    );
  }

  render() {
    return (
      <div className='allergen-filters-slide-down-panel'>
        <div className='panel-header'>
          <div id='header-row'>
            <div
              id='filter-txt'
              className='panel-header-element'
              onClick={this.onExpansionChanged.bind(this)}
            >
              Allergen Filters
            </div>
            <div className='panel-header-element'>
              <div id='counter'
                onClick={this.onExpansionChanged.bind(this)}
                className={this.state.selected.size > 0? 'bg-danger': ''}
              >
                {this.state.selected.size}
              </div>
            </div>
            <div id='expand-btn'
              className='panel-header-element'
              onClick={this.onExpansionChanged.bind(this)}
            >
              <ExpandArrow className={
                !this.props.expanded?
                  'expand-arrow-more': 'expand-arrow-less'
              }/>
            </div>
          </div>
        </div>
        {this.props.expanded?
          <div className='panel-body'>
            {this.genGrid()}
            <Button
              disabled={this.state.selected.size === 0}
              id='save-btn'
              variant='warning'
              onClick={this.onClearFilter.bind(this)}
            >
              Clear All
            </Button>
            <div></div>
          </div>
          :
          <div></div>
        }
      </div>
    );
  }
}
