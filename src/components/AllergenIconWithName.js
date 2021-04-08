import React from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";

const AllergenIcon = styled.div`
  display: inline-block;
  height: 36px;
  min-width: 90px;
  border-radius: 18px;
  background-color: transparent;
  position: relative;
  line-height: 36px;
  padding: 0 25px 0 46px;
  color: #8a9db7;
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
    fill: #8a9db7;
  }
`;

const OrangeDot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: #f3a35c;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

export default function (props) {
  return (
    <AllergenIcon className={props.className}>
      <StyledSVG
        wrapper="div"
        src={`${process.env.REACT_APP_API_BASE_URL}/api/assets/tag_icons/${props.tag.name}.svg`}
      />
      {props.tag.name}
      {props.showNotice ? <OrangeDot /> : null}
    </AllergenIcon>
  );
}
