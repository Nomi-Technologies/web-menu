import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from './expand_arrow.svg';

const ExpansionArrow = styled.div`
  margin: 0 25px;
  & svg {
    transform: ${props => props.pointingUp ? 'rotate(180deg)' : 0}
  }
`;

export default function(props) {
  return(
    <ExpansionArrow {...props}>
      <Arrow/>
    </ExpansionArrow>
  )
}