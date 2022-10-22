import React, { useState, useContext, useEffect } from "react";
import RestaurantContext from "../../RestaurantContext";
import MenuScreen from "./MenuScreen";
import styled from "styled-components";
import InitialLoadingPage from "narrow-screen/components/InitialLoadingPage";

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
  const [isLoading, setIsLoading] = useState(true);
  const [canFinishLoad, setCanFinishLoad] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanFinishLoad(true); // Only allowed to finish loading after 2 seconds
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  console.log(canFinishLoad);

  useEffect(() => {
    // console.log(context.menu);
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
