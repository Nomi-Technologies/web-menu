import React from 'react';
import './FilterSlideUpPanel.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default class FilterSlideUpPanel extends React.Component {

  state = {
    expanded: false,
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
    const selected = new Set();
    this.setState({ selected: selected });
    this.props.onApplyFilter(selected, this.state.expanded);
  }

  genGrid() {
    const tags = this.props.tags;
    let rows = [];
    for (let i = 0; i < tags.length; i += 3) {
      let cols = [];
      for (let j = 0; j < 3; ++j) {
        if (i + j >= tags.length) { 
          cols.push(<Col key={j}></Col>);
          continue;
        }
        cols.push(<Col key={j}>
          <div 
            className={this.state.selected.has(tags[i+j])? 'tag-selected': 'tag-unselected'}
            onClick={() => {
              const tag = tags[i + j];
              let selected = this.state.selected;
              if (selected.has(tag.id)) { selected.delete(tag.id); }
              else { selected.add(tag.id); }
              this.setState({ selected: selected });
            }}
          >
            {tags[i+j].name}
          </div>
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
      <div className='slide-up-panel'>
        <div className='panel-header'>
          <div id='header-row'>
            <div id='filter-txt' className='panel-header-element'>
              Filters
            </div>
            <div id='count' className='panel-header-element' >
              <div id='counter'
                className={this.state.selected.size > 0? 'bg-danger': ''}
              >
                {this.state.selected.size}
              </div>
            </div>
            <div id='spacer' className='panel-header-element'></div>
            <div id='clear-btn-wrapper' className='panel-header-element'>
              <Button id='clear-btn'
                variant='secondary'
                disabled={this.state.selected.size === 0}
                onClick={this.onClearFilter.bind(this)}
              >
                Clear
              </Button>
            </div>
            <div id='expand-btn' 
              className='panel-header-element'
              onClick={this.onExpansionChanged.bind(this)}
            >
              Expand
            </div>
            
          </div>
        </div>
        {this.props.expanded?
          <div className='panel-body'>
            {this.genGrid()}
            <Button 
              id='save-btn'
              variant='warning'
              onClick={this.onApplyFilter.bind(this)}
            >
              Apply
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