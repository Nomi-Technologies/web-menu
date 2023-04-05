import React, { useState, useContext, useEffect } from "react";
import RestaurantContext from "../../RestaurantContext";
import MenuScreen from "./MenuScreen";
import styled from "styled-components";
import InitialLoadingPage from "./InitialLoadingPage";

const PageError = styled.div`
  position: relative;
  text-align: center;
  color: #ff726f;
  margin-top: 5%;
  font-size: 24px;
  font-weight: bold;
`;

export default () => {
  const context = useContext(RestaurantContext);
  const [isLoading, setIsLoading] = useState(true);
  const [canFinishLoad, setCanFinishLoad] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanFinishLoad(true); // Only allowed to finish loading after 2 seconds
    }, 3500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (context.menu !== undefined) {
      setIsLoading(false);
    }
  }, [context.menu]);

  function handleFinish() {
    setFinished(true);
  }

  return (
    <>
      {finished && !isLoading ? (
        <MenuScreen />
      ) : context.error ? (
        <PageError>
          There was an error loading this page. Please try reloading the page or
          contact the Nomi team by filling out a form at dinewithnomi.com
        </PageError>
      ) : (
        <InitialLoadingPage
          restaurantId={context.restaurant?.id}
          loading={isLoading || !canFinishLoad}
          onFinish={handleFinish}
        />
      )}
    </>
  );
};
