import React from 'react';
import './HotScrollSidePanel.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as ExpandArrow } from '../../components/expand_arrow.svg';

export default class HotScrollSidePanel extends React.Component {

  state = {
    selected: new Set(),
  };

  onExpansionChanged() {
    const expanded = this.props.expanded;
    this.props.onExpansionChanged(!expanded);
  }

  render() {
    return (
      <div className='slide-down-panel'>
        <div className='panel-header'>
          <div id='header-row'>
            <div
              id='filter-txt'
              className='panel-header-element'
              onClick={this.onExpansionChanged.bind(this)}
            >
              Menu Sections
            </div>
            <div id='expand-btn'
              className='panel-header-element'
              onClick={this.onExpansionChanged.bind(this)}
            >
              <ExpandArrow className={
                this.props.expanded?
                  'expand-arrow-more': 'expand-arrow-less'
              }/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}