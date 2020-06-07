import React from 'react';
import './TagButton.css';
import classNames from 'classnames';


export default function TagButton(props) {

  return (
    <div className={classNames({
        [props.className]: true,
        'tag-btn': true,
        'tag-selected': props.selected
        })
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}