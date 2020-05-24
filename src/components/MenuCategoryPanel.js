import React from 'react';
import DishTile from './DishTile';
import './MenuCategoryPanel.css';

export default class MenuCategoryPanel extends React.Component {

  render() {
    return (<div className='dish-list-wrapper'>
      {this.props.dishes.map(dish => 
        <DishTile key={dish.name} dish={dish}/>
      )}
    </div>);
  }
}
