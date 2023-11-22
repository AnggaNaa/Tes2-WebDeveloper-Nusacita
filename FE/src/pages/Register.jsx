"use client";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../libs/api";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await API.post("/signup", {
        username: username,
        email: email,
        password: password,
      });

      const token = response.data.token;
      setAuthToken(token);

      return navigate("/login");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign up to your account</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password minimum 8 characters"
              minLength={8}
            />
          </FormControl>
          {error && <Text color={"red.500"}>{error}</Text>}
          <Stack spacing={6}>
            <Flex justifyContent={"space-between"}>
              <Text>Already a user? </Text>
              <Text
                color={"blue.500"}
                cursor={"pointer"}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Text>
            </Flex>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleRegister}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
