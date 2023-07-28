import React from "react";
import TinderCards from "../components/TinderCards";
import RouteSlider from "../components/animated/RouteSlider";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "../components/animated/Spinner";

export const HomePage = () => {
  const { user } = useAuthContext();
  //TODO Set State control for swipe eg: delete an goback
  const { err, loading, response } = useFetch(
    `http://localhost:5000/api/users/Swipes/${user._id}`
  );
  return (
    <div className="h-[calc(100vh-5rem)]">
      <>
        {!loading && !err ? (
          <TinderCards db={response} />
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            {" "}
            <Spinner className="!w-12 !h-12" />
          </div>
        )}
      </>
      <RouteSlider />
    </div>
  );
};
