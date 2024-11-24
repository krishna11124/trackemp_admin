import React, { useState } from "react";
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { CiSearch } from "react-icons/ci";

function Input({ type, ...props }:any) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (type === "select") {
    return (
      <ChakraInput
        placeholder="Enter your Email"
        rounded={"full"}
        color="primary.500"
        fontSize={'14px'}
        _placeholder={{ color: "primary.200" }}
        borderColor={"primary.200"}
        px={"30px"}
        py={"20px"}
        h={"54px"}
        {...props}
      />
    );
  } else if (type === "password") {
    return (
      <InputGroup>
        <ChakraInput
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          rounded={"full"}
          color="primary.500"
          _placeholder={{ color: "primary.200" }}
          borderColor={"primary.200"}
          px={"30px"}
          py={"20px"}
          h={"54px"}
          {...props}
        />
        <InputRightElement top={"6px"} right={"10px"}>
          <IconButton
            h={"54px"}
            aria-label={showPassword ? "Hide password" : "Show password"}
            variant="ghost"
            px={"10px"}
            color="primary.200"
            size={"lg"}
            fontSize={'14px'}
            backgroundImage={"transparent"}
            _hover={{
              backgroundColor: "transparent",
            }}
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onClick={togglePasswordVisibility}
          />
        </InputRightElement>
      </InputGroup>
    );
  } else if (type === "search") {
    return (
      <InputGroup>
        <InputLeftElement pointerEvents="none" top={"0px"} left={"6px"} h={'full'} display={'flex'} justifyContent={'center'}>
          <IconButton
            variant="ghost"
            color="primary.200"
            fontSize={'x-large'}
            backgroundImage={"transparent"}
            _hover={{
              backgroundColor: "transparent",
            }}
            aria-label="search"
            
          >
            <CiSearch />
          </IconButton>
        </InputLeftElement>
        <ChakraInput
          type="text"
          w="363px"
          backgroundColor={"rgba(250, 250, 251, 0.9)"}
          placeholder="Search for anything..."
          rounded={"full"}
          color="primary.500"
          fontSize={'14px'}
          _placeholder={{ color: "primary.200" }}
          px={"30px"}
          borderColor={'transparent'}
          py={"24px"}
          pl={'50px'}
          boxShadow={'0px 4px 6px 0px rgba(0, 0, 0, 0.02)'}
          {...props}


        />
      </InputGroup>
    );
  } else {
    return (
      <ChakraInput
        type={type}
        placeholder="Enter your Text"
        rounded={"full"}
        color="primary.500"
        _placeholder={{ color: "primary.200" }}
        borderColor={"primary.200"}
        px={"30px"}
        py={"20px"}
        h={"54px"}
        fontSize={'14px'}
        {...props}
      />
    );
  }
}

export default Input;
