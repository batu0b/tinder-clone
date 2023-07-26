import React from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useNavigate } from "react-router-dom";
import RouteSlider from "../components/animated/RouteSlider";
export const MessagePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ChatList
        className="chat-list"
        onClick={(props) => navigate(`/messages/${props.title}`)}
        dataSource={[
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Kursat",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(),
            unread: 3,
          },
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Asw",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(),
            unread: 3,
          },
        ]}
      />
      <RouteSlider />
    </div>
  );
};
