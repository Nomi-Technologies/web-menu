import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './SharedDishTile.css';
import classNames from 'classnames';

export default function DishTile(props) {
  return (
    <Jumbotron
      className={classNames({
        [props.className]: true,
        'shared-dish-tile': true,
      })}
    >
      <div className='dish-title'>
        <div className='dish-name'>{props.dish.name}</div>
        <div className='title-ending'>{props.titleEnding}</div>
      </div>
      <div className='separator'></div>
      <div className='dish-subtitle'>
        <div className='description'>{props.dish.description}</div>
        <div className='subtitle-ending'>{props.subtitleEnding}</div>
      </div>
    </Jumbotron>
  )
}