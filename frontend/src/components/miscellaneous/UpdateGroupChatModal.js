import React, { useState } from "react";
import {
  Button,
  IconButton,
  Image,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  FormControl,
  Input,
  Box,
  useStatStyles,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setfetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setgroupChatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setsearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [renameLoading, setrenameLoading] = useState(false);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only Admins can remove someone",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setloading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);

      setfetchAgain(!fetchAgain);
      fetchMessages();
      setloading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in Group",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can add someone",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setloading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setfetchAgain(!fetchAgain);
      setloading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };
  const handleSearch = async (query) => {
    setsearch(query);
    if (!query) {
      return;
    }
    try {
      setloading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setloading(false);
      setsearchResults(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setrenameLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      console.log(data);

      setSelectedChat(data);
      setfetchAgain(!fetchAgain);
      setrenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setrenameLoading(false);
    }
    setgroupChatName("");
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setgroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                isLoading={renameLoading}
                ml={1}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to Group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
