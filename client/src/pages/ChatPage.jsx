import React from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import RouteSlider from "../components/animated/RouteSlider";

export default function ChatPage() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="h-full p-4  overflow-y-auto lg:no-scrollbar">
        <div className="text-center text-gray-600">
          <h3 className="uppercase">you were matched</h3>
          <p className="font-medium">{date}</p>
        </div>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              title: "Mehmet",
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
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
              title: "ALi",
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
      <RouteSlider />
    </div>
  );
}
