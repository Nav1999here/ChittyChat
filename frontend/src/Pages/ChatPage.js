import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {chats.map((chat) => (
        <div>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
