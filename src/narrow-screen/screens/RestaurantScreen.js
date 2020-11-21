import React, { useState, useContext, useEffect } from "react";
import RestaurantContext from '../../restaurant-context';
import MenuScreen from "./MenuScreen";
import styled from "styled-components";

const PageError = styled.div`
  position: relative;
  text-align: center;
  color: #ff726f;
  margin-top: 5%;
  font-size: 24px;
  font-weight: bold;
`;

const Loading = styled.div`
  position: relative;
  text-align: center;
  margin-top: 5%;
  font-size: 32px;
  font-weight: bold;
`;

export default () => {
  const context = useContext(RestaurantContext);

  return (
    <>
      {context.menu ?
      <MenuScreen /> : context.error ? (
        <PageError>
          There was an error loading this page. Please try reloading the page
          or contact the Nomi team by filling out a form at dinewithnomi.com
        </PageError>
      ) : (
        <Loading>Restaurant Menu Loading...</Loading>
      )}
    </>
  );
}
