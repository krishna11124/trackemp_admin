import React from "react";
import {   Text } from "@chakra-ui/react";

const CustomText = ({ children,...props }:any) => {
  return (
    <Text
      as="p"
      fontFamily="Urbanist"
      fontSize="14px"
      fontWeight="500"
      lineHeight="24px"
      letterSpacing="0em"
      textAlign="left"
      {...props}
      
    >
      {children}
    </Text>
  );
};

export default CustomText;
