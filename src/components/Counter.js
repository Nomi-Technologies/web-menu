import React from 'react';
import styled from 'styled-components';

const Counter = styled.div`
  /* includes some hard-coded stuff because text is off-center smh */
  font-size: 14px;
  width: ${props => props.radius ?? '22px'};
  height: ${props => props.radius ?? '22px'};
  border-radius: ${props => props.radius ?? '11px'};
  background-color: ${props => props.active ? (props.activeColor ?? '#00807F') : '#8A9DB7'};
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