import React from 'react';
import styled from 'styled-components';
import BannerImage from "components/web_menu_banner.jpg";

const Banner = styled.div`
  font-family: 'Oswald', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
  top: 0px;
  background: url(${BannerImage});
  background-color: black;
  background-size: cover;
  z-index: 10;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const BlackLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function(props) {
  return (
    <Banner className={props.className}>
      {props.children}
      <BlackLayer/>
    </Banner>
  )
}