import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  border: solid 2px #E3EDF2;
  height: 40px;
  background-color: ${props => props.selected ? '#E3EDF2' : '#F9F9F9'};
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  font-weight: 500;
`;

export default function TagButton(props) {

  return (
    <Button 
      {...props}
    >
      {props.children}
    </Button>
  );
}