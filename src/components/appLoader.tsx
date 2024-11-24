import { Spinner, Box, Image } from "@chakra-ui/react";
import CustomText from "./Topography/Text";

function MyLoader() {
  return (
    <Box
      backgroundColor="rgba(0, 0, 0, 0.3)" // Semi-transparent black background color
      position="fixed"
      zIndex="9999"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      scrollBehavior={"unset"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign="center" position={"relative"}>
        <Box
          position={"absolute"}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          w="full"
          h="full"
        ></Box>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="rgba(0, 0, 0, 0.3)"
          color="rgba(69, 193, 182, 1)"
          width={"70px"}
          height={"70px"}
          mb="4"
        />
      </Box>
    </Box>
  );
}

export default MyLoader;
