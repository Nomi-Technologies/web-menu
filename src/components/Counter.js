import React from 'react';
import styled from 'styled-components';

const Counter = styled.div`
  margin-left: 5px;
  /* includes some hard-coded stuff because text is off-center smh */
  display: inline-block;
  line-height: 23px;
  text-align: center;
  height: 22px;
  min-width: 22px;
  border-radius: 11px;
  background-color: ${props => props.active ? '#E9003E' : '#8A9DB7'};
  color: white;
`;

export default function(props) {
  return (
    <Counter {...props}>
      {props.children}
    </Counter>
  )
}