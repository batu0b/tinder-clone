import React from "react";
import { motion, useIsPresent } from "framer-motion";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useNavigate } from "react-router-dom";
export const MessagePage = () => {
  const isPresent = useIsPresent();
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
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </div>
  );
};
