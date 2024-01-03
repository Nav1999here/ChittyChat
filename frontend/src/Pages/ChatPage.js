import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  //const { user, setUser } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {console.log(user)}
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats user={user} />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
