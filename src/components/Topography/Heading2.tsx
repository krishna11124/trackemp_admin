import React from "react";
import {  Heading } from "@chakra-ui/react";

const CustomHeading2 = ({ children,...props }:any) => {
  return (
    <Heading
      as="h3"
      fontSize="14px"
      fontWeight="300"
      color={"gray"}
      lineHeight="24px"
      letterSpacing="0em"
      textAlign="left"
      {...props}
      
    >
      {children}
    </Heading>
  );
};

export default CustomHeading2;
