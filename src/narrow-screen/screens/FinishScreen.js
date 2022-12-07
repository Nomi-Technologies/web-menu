import React, { useContext, useEffect, useRef } from "react";
import RestaurantContext from "../../RestaurantContext";
import styled from "styled-components";

const BottomPanel = styled.div`
  transform: ${(props) => (props.open ? "translateY(0)" : "translateY(100%)")};
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 150;
  right: 0;
  max-height: 100vh;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  background: #ffffff;
  overflow-y: auto;
  text-align: center;
  padding-top: 25vh;
`;

const Padded = styled.div`
  padding: 0 24px;
`;

const StartButton = styled.div`
  height: 46px;
  text-align: center;
  line-height: 48px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #f06441;
  box-shadow: 0px 10px 20px rbga(240, 100, 65, 0.2);
`;

const RestaurantLogo = styled.a`
  padding-top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  line-height: 60px;

  & img[alt] {
    max-height: 35px;
    max-width: 100px;
    font-size: 12px;
    line-height: 12px;
  }
`;

export default ({ finishScreenOpen, restaurantLogo }) => {
  const myRef = useRef();
  const context = useContext(RestaurantContext);
  const thankYouText =
    "Thank you so much for joining us! Please leave us a review and follow us on social media.";

  const resetState = () => {
    context.setSavedDishes([]);
    window.location.reload(false);
  };

  return (
    <BottomPanel open={finishScreenOpen} ref={myRef}>
      <Padded>
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          <>
            <div style={{ paddingTop: 30 }}>
              {restaurantLogo ? (
                <RestaurantLogo href={context.restaurant?.logo}>
                  <img
                    alt={`${context.restaurant.name} logo`}
                    src={restaurantLogo}
                    style={{
                      width: 200,
                    }}
                  />
                </RestaurantLogo>
              ) : (
                <div>{context.restaurant.name} logo</div>
              )}
            </div>
            <div
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontFamily: "SourceSerifPro-Regular",
                color: "#627083",
                lineHeight: "1.5em",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              {thankYouText}
            </div>
            <StartButton
              style={{
                left: "5%",
                right: "5%",
              }}
            >
              <div className="tray-clear-button" onClick={resetState}>
                START OVER
              </div>
            </StartButton>
          </>
        </div>
      </Padded>
    </BottomPanel>
  );
};
