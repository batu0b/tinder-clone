import React, { useEffect, useRef, useState } from "react";
import { Button, Input, MessageList } from "react-chat-elements";
import RouteSlider from "../components/animated/RouteSlider";
import { useFetch } from "../hooks/useFetch";
import { getAuthToken } from "../helpers";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/animated/Spinner";
import io from "socket.io-client";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext/AuthContext";

var socket;

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const { chatId } = useParams();
  const { user } = useAuthContext();
  const token = getAuthToken();
  const ChatBoxRef = useRef(null);
  //FIXME Fix socket disconnect
  const config = {
    headers: { "x-auth-token": token },
  };
  const { response, loading, setResponse } = useFetch(
    `${process.env.REACT_APP_API_URL}api/messages/${chatId}`,
    config
  );
  const newDate = new Date(response?.createdAt);

  const scrollToBottom = () => {
    ChatBoxRef.current.scrollTop = ChatBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    if (ChatBoxRef.current) {
      scrollToBottom();
    }
  }, [ChatBoxRef.current, response?.messages]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_API_URL}`);
    socket.on("connected", () => {});
    socket.emit("join chat", chatId);
  }, []);

  useEffect(() => {
    socket.on("message recieved", (data) => {
      console.log(data);
      setResponse((prev) => {
        return { ...prev, messages: [...prev.messages, data] };
      });
    });
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const content = message;
      setMessage("");
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}api/messages/`,
          {
            content: content,
            chatId: chatId,
          },
          config
        )
        .then((res) => res.data)
        .then((data) => {
          const newData = {
            content: data.content,
            sender: {
              avatarFile: data.sender.avatarFile,
              _id: data.sender._id,
              fullName: data.sender.fullName,
            },
            createdAt: new Date(),
          };
          setResponse((prev) => {
            return {
              ...prev,
              messages: [...prev.messages, newData],
            };
          });
          socket.emit("new message", {
            newMessage: newData,
            room: chatId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      {loading ? (
        <div className="h-screen-without-header w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div
          ref={ChatBoxRef}
          className="h-full p-4  overflow-y-auto lg:no-scrollbar"
        >
          <div className="text-center text-gray-600">
            <h3 className="uppercase">you were matched</h3>
            <p className="font-medium">{newDate.toLocaleDateString()}</p>
          </div>

          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={response.messages.map((x) => {
              return {
                avatar: x.sender.avatarFile,
                type: "text",
                text: x.content,
                date: x.createdAt,
                title: x.sender.fullName,
                position: x.sender._id === user._id ? "right" : "left",
              };
            })}
          />
        </div>
      )}

      <Input
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 mt-auto no-scrollbar"
        rightButtons={
          <Button
            onClick={sendMessage}
            backgroundColor="#fe5a63"
            text={"SEND"}
          />
        }
        clear={() => true}
        placeholder="Type here..."
        multiline={false}
      />
      <RouteSlider />
    </div>
  );
}
