import React from "react";
import { BackIco, MessageIco, PersonIcon } from "../assets/icons";
import tinder from "../assets/tinder.png";
import { useMatch, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const homepage = useMatch("/");
  return (
    <div className="w-full select-none shadow-sm flex items-center justify-between py-4 px-8">
      {homepage ? (
        <PersonIcon className="w-10 h-12 " />
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
