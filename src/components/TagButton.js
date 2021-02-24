import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  height: 40px;
  background-color: ${props => props.selected ? '#E3EDF2' : '#F9F9F9'};
  border-radius: 4px;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function TagButton(props) {

  return (
    <Button 
      {...props}
    >
      <Content>{props.children}</Content>
    </Button>
  );
}