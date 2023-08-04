import React from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useNavigate } from "react-router-dom";
import RouteSlider from "../components/animated/RouteSlider";
import { useFetch } from "../hooks/useFetch";
import { getAuthToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { Spinner } from "../components/animated/Spinner";
export const MessagePage = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { user } = useAuthContext();
  const { response, loading } = useFetch(`http://localhost:5000/api/chats`, {
    headers: { "x-auth-token": token },
  });
  const chatList = response?.map((x) => {
    return {
      title: x.users.filter((y) => y._id !== user._id)[0].fullName,
      avatar: x.users.filter((y) => y._id !== user._id)[0].avatarFile,
      date: false,
      id: x._id,
    };
  });

  console.log(response);
  return (
    <div>
      {loading ? (
        <div className="h-screen-without-header w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ChatList
          className="chat-list"
          onClick={(props) => navigate(`/messages/${props.id}`)}
          dataSource={chatList}
        />
      )}

      <RouteSlider />
    </div>
  );
};
