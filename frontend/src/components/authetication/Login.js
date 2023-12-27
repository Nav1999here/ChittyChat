import { useState } from "react";
import { FormLabel, VStack } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";
import React from "react";

export const Login = () => {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);

  const handleShowPassword = () => setShow(!show);

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="loginemail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="loginpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login{" "}
      </Button>
      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guestUser@example.com");
          setPassword("qwerty123");
        }}
      >
        Get Guest User Credetials{" "}
      </Button>
    </VStack>
  );
};
