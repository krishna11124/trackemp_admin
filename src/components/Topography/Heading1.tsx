import React from "react";
import { Heading } from "@chakra-ui/react";
import Colors from "../../constants/colors";

const CustomHeading = ({ children , ...props}:any) => {
  return (
    <Heading
      fontSize="25px"
      as={'h1'}
      fontWeight="800"
      lineHeight="24px"
      letterSpacing="0em"
      textAlign="left"
      {...props}
    >
      {children}
    </Heading>
  );
};

export default CustomHeading;
