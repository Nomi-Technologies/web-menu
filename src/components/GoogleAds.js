import React, { useEffect } from "react";

export default function (props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const displayAds =
    window.location.pathname === "/" ||
    window.location.pathname === "/demo-restaurant" ||
    window.location.pathname === "/test-restaurant";

  return (
    <ins
      className={`adsbygoogle ${props.className}`}
      style={{ display: displayAds ? "block" : "none" }}
      data-ad-client="ca-pub-7240049376258703"
      data-ad-slot={props.slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
