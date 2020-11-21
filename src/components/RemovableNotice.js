import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  font-family: 'HK Grotesk';
  font-weight: 500;
  font-size: 14px;
  padding: 16px;
  padding-left: 40px;
  background-color: #ebeef5;
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
  right: 10px;
  top: 22px;
  left: 20px;
`;

export default ({ className }) => {
  return <Banner className={className}>
    This dish can be modified to meet your dietary needs.  Please ask your waiter.
    <OrangeDot />
  </Banner>
}