import React from "react";
import styled from "styled-components";

const Button = styled.div`
  position: relative;
  height: 40px;
  background-color: ${(props) => (props.selected ? "#E3EDF2" : "#F9F9F9")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div``;

export default function TagButton(props) {
  return (
    <Button {...props}>
      <Content>{props.children}</Content>
    </Button>
  );
}
