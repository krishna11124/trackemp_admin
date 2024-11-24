import { VStack } from "@chakra-ui/react";
import React from "react";

function WrapperCard({ children, ...props }:any) {
  return (
    <VStack
      as={"section"}
      w={"full"}
      bgColor={"white"}
      rounded={"lg"}
      p={4}
      gap={3}
      alignItems={"start"}
      {...props}
    >
      {children}
    </VStack>
  );
}

export default WrapperCard;
