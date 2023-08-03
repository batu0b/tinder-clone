import React from "react";
import { BackIco, MessageIco, PersonIcon } from "../assets/icons";
import tinder from "../assets/tinder.png";
import { useMatch, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/AuthContext";
export default function Header() {
  const navigate = useNavigate();
  const homepage = useMatch("/");
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="w-full select-none shadow-sm flex items-center justify-between py-4 px-8">
      {homepage ? (
        <div className=" border-[3px] cursor-pointer rounded-full border-[#ff3269]">
          <img className="w-10" src={user.avatarFile} alt="" />
        </div>
      ) : (
        <button onClick={() => navigate("/")}>
          <BackIco />
        </button>
      )}

      <img src={tinder} className="w-10 h-12" alt="" />

      <button onClick={() => navigate("messages")}>
        <MessageIco className="w-10 h-12 " />
      </button>
    </div>
  );
}
