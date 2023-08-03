import React, { useEffect } from "react";
import RouteSlider from "../components/animated/RouteSlider";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { getAuthToken } from "../helpers";

export default function ProfilePage() {
  const { user, logOut } = useAuthContext();

  return (
    <div className="h-screen-without-header select-none justify-center flex items-center">
      <div className="flex flex-col items-center gap-12">
        <div className="border-4 w-fit h-fit shadow-md shadow-black rounded-full border-[#ff3269]">
          <img className="w-56 max-md:w-48 " src={user.avatarFile} alt="" />
        </div>
        <h3 className="text-xl font-semibold"> {user.fullName} </h3>
        <button
          onClick={logOut}
          className="circleButton to-[#ff796a] hover:brightness-125 via-[#fa4952] from-[#ff2b64] bg-gradient-to-tr text-white  "
        >
          Log Out
        </button>
      </div>
      <RouteSlider />
    </div>
  );
}
