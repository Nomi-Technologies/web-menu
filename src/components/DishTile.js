import React from 'react';
import './DishTile.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class DishTile extends React.Component {

  render() {
    return (<Jumbotron className='dish-tile'>
      <div className='dish-name'>{this.props.dish.name}</div>
      <div className='separator'></div>
      <div className='description'>{this.props.dish.description}</div>
    </Jumbotron>);
  }
}