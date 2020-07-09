import React from 'react';
import DishTile from './DishTile';
import './MenuList.css';

export default class MenuList extends React.Component {
  render() {
    return (<div ref={this.props.reactRef}>
      <div className='category-title'>{this.props.category}</div>
      <div className='dish-list-wrapper-web'>
        <div className='col-md-6'>
          {this.props.dishes.slice(0,Math.floor(this.props.dishes.length / 2)).map(dish =>
            <DishTile key={dish.name} dish={dish}/>
          )}
        </div>
        <div className='col-md-6'>
          {this.props.dishes.slice(Math.floor(this.props.dishes.length / 2)).map(dish =>
            <DishTile key={dish.name} dish={dish}/>
          )}
        </div>
      </div>
    </div>);
  }
}
