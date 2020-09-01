import React from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

const AllergenIcon = styled.div`
  display: inline-block;
  height: 36px;
  min-width: 90px;
  border-radius: 18px;
  background-color: rgba(214, 221, 236, 0.5);
  position: relative;
  line-height: 36px;
  padding: 0 10px 0 46px;
  color: #8A9DB7;
  font-weight: 500;
  font-size: 14px;
`;

const StyledSVG = styled(ReactSVG)`
  position: absolute;
  left: 0;
  top: 0;
  & svg {
    display: inline-block;
    margin-right: 20px;
    height: 36px;
    width: 36px;
  }

  & svg path {
    fill: #8A9DB7;
  }
`;

export default function(props) {

  return (
    <AllergenIcon className={props.className}>
      <StyledSVG
        wrapper='div'
        src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/tag_icons/${props.tag.name}.svg`}
      />
      {props.tag.name}
    </AllergenIcon>
  );
}