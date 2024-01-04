import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const { user, setUser } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);

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
        {user && (
          <MyChats fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
