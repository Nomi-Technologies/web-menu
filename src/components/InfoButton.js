import React from 'react';
import styled from "styled-components";

const AllergenInfoButton = styled.button`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  line-height: 24px;
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  font-weight: bold;
  color: white;
  background-color: #8A9DB7;
`;

export default function(props) {
  return (
    <AllergenInfoButton {...props}>
      i
    </AllergenInfoButton>
  );
}