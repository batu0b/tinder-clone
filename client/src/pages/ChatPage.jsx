import React from "react";
import { motion, useIsPresent } from "framer-motion";
import { Button, Input, MessageList } from "react-chat-elements";

export default function ChatPage() {
  const isPresent = useIsPresent();

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="h-full p-4  overflow-y-auto lg:no-scrollbar">
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              title:"Mehmet",
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title:"ALi"
            },
          ]}
        />
      </div>

      <Input
        className="border-2 mt-auto no-scrollbar"
        rightButtons={<Button backgroundColor="#fe5a63" text={"SEND"} />}
        placeholder="Type here..."
        multiline={true}
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
}
