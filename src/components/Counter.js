import React from 'react';
import styled from 'styled-components';

const Counter = styled.div`
  font-size: 14px;
  width: ${props => props.radius ?? '22px'};
  height: ${props => props.radius ?? '22px'};
  border-radius: ${props => props.radius ?? '11px'};
  background-color: ${props => props.active ? (props.activeColor ?? '#00807F') : '#C9D2DE'};
  color: white;
  position: relative;
`;

const Number = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function(props) {
  return (
    <Counter {...props}>
      <Number>
        {props.children}
      </Number>
    </Counter>
  )
}