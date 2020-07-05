import React from 'react';
import DishTile from './DishTile';
import './MenuList.css';

export default function MenuList(props) {
  return (<div>
    <div className='category-title'>{props.category}</div>
    <div className='dish-list-wrapper'>
      <div className='col-md-6'>
      {props.dishes.slice(0,Math.floor(props.dishes.length / 2)).map(dish =>
        <DishTile key={dish.name} dish={dish}/>
      )}
      </div>
      <div className='col-md-6'>
      {props.dishes.slice(Math.floor(props.dishes.length / 2)).map(dish =>
        <DishTile key={dish.name} dish={dish}/>
      )}
      </div>
    </div>
  </div>);
}
