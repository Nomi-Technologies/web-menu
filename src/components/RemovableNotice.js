import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  font-family: "HK Grotesk";
  font-weight: 500;
  font-size: 14px;
  padding: 16px;
  padding-left: 40px;
  background-color: #ebeef5;
  border-radius: 6px;
  position: relative;
  letter-spacing: 0.02em;
  line-height: 18px;
`;

const OrangeDot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: #f3a35c;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
`;

export default ({ className }) => {
  return (
    <Banner className={className}>
      Contains <span style={{ fontWeight: "bold" }}>removable allergens</span>
      <OrangeDot />
    </Banner>
  );
};
