import React, { useEffect, useState } from "react";
import DishTile from "./DishTile";
import styled from "styled-components";
import LoadingAnimation from "components/loading-animation.gif";
import Bacari from "components/bacari-logo.png";
import { getRestaurantLogo } from "utils";

const LOADING_QUOTES = [
  "“One cannot think, love, sleep well if one has not dined well.” -Virginia Woolf",
  "“If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.” -J.R.R. Tolkien",
  "“People who love to eat are always the best people.” – Julia Child",
  "“One of the very nicest things about life is the way we must regularly stop whatever it is we are doing and devote our attention to eating.”  – Luciano Pavarotti",
  "“What I say is that, if a fellow really likes potatoes, he must be a pretty decent sort of fellow.” – A.A. Milne",
  "“After a good dinner one can forgive anybody, even one’s own relatives.” – Oscar Wilde",
];

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

export default function (props) {
  const { restaurantId, loading } = props;
  const [loaded, setLoaded] = useState(false);
  const [logo, setLogo] = useState(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (!loaded) {
      const newQuote =
        LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
      setQuote(newQuote);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (restaurantId) {
      // getRestaurantLogo(restaurantId).then(setLogo);
      setLogo(Bacari);
    }
  }, [restaurantId]);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      {loading ? (
        <img
          src={LoadingAnimation}
          style={{
            width: 200,
            position: "absolute",
            top: window.innerHeight / 2 - 160,
            left: window.innerWidth / 2 - 100,
          }}
        />
      ) : (
        <>
          {logo && (
            <img
              src={logo}
              style={{
                width: 200,
                position: "absolute",
                top: window.innerHeight / 2 - 100,
                left: window.innerWidth / 2 - 100,
              }}
            />
          )}
          <StartButton
            style={{
              position: "absolute",
              top: window.innerHeight / 2,
              left: "5%",
              right: "5%",
            }}
          >
            <div className="tray-clear-button" on>
              START MY MENU
            </div>
          </StartButton>
        </>
      )}

      <div
        style={{
          width: "70%",
          left: "15%",
          right: "15%",
          textAlign: "center",
          position: "absolute",
          top: window.innerHeight / 2 + 100,
          fontFamily: "SourceSerifPro-Regular",
          color: "#627083",
          lineHeight: "1.5em",
          fontSize: 16,
        }}
      >
        {quote}
      </div>
    </div>
    //   <DishList className={props.className} ref={props.categoryRef}>
    //     <CategoryTitle>{props.category.name}</CategoryTitle>
    //     {props.dishes.length > 0 ? (
    //       <>
    //         <CategoryDescription>
    //           {props.category.description}
    //         </CategoryDescription>
    //         {props.dishes.map((dish) => (
    //           <DishTile
    //             key={dish.id}
    //             dish={dish}
    //             menuHasAllergens={props.menuHasAllergens}
    //           />
    //         ))}
    //       </>
    //     ) : (
    //       <NoDishesMessage>
    //         No dishes in this section. Check the applied filters.
    //       </NoDishesMessage>
    //     )}
    //   </DishList>
  );
}
