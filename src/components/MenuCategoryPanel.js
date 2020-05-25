import React from 'react';
import DishTile from './DishTile';
import './MenuCategoryPanel.css';

export default function MenuCategoryPanel(props) {
  return (<div className='dish-list-wrapper'>
    {props.dishes.map(dish => 
      <DishTile key={dish.name} dish={dish}/>
    )}
  </div>);
}
