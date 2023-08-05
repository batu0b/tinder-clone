import React from "react";
import TinderCards from "../components/TinderCards";
import RouteSlider from "../components/animated/RouteSlider";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "../components/animated/Spinner";

export const HomePage = () => {
  const { user } = useAuthContext();
  const { err, loading, response, fetchData, setResponse } = useFetch(
    `${process.env.REACT_APP_API_URL}api/users/Swipes/${user._id}`
  );
  return (
    <div className="h-screen-without-header">
      <>
        {!loading && !err ? (
          <TinderCards
            db={response}
            triggerFetch={fetchData}
            setResponse={setResponse}
          />
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
