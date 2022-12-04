import React, { useEffect } from "react";

export default function (props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const displayAds =
    window.location.pathname === "/" ||
    window.location.pathname === "/demo-restaurant";

  return (
    <ins
      className={`adsbygoogle ${props.className}`}
      style={{
        display: "block",
        visibility: displayAds ? "visible" : "hidden",
      }}
      data-ad-client="ca-pub-7240049376258703"
      data-ad-slot={props.slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
