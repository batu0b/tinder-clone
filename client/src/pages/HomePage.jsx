import React from "react";
import TinderCards from "../components/TinderCards";
import RouteSlider from "../components/animated/RouteSlider";

export const HomePage = () => {
  return (
    <div className="h-[calc(100vh-5rem)]">
      <TinderCards />
      <RouteSlider />
    </div>
  );
};
