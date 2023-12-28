import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React from "react";
import { Login } from "../components/authetication/Login";
import { SignUp } from "../components/authetication/SignUp";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);
  console.log("home");

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="black"
        w="100%"
        m="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
        opacity="90%"
      >
        <Text
          textAlign="center"
          fontSize="4xl"
          fontFamily="Work Sans"
          color="white"
        >
          CHITTY CHAT
        </Text>
      </Box>
      <Box
        bg="black"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        opacity="90%"
        textColor="white"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%" textColor="white">
              Login
            </Tab>
            <Tab width="50%" textColor="white">
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
