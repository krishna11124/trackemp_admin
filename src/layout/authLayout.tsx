import React from "react";
import { Box, Flex, Image, Stack } from "@chakra-ui/react";
import Colors from "../constants/colors";

const AuthLayout = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image: string;
}) => {
  return (
    <Box w='100%'>
      <Stack spacing={8} mx={"auto"} direction={{ base: "column", md: "row" }}>
        <Stack spacing={4} w={"100%"}>
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthLayout;
