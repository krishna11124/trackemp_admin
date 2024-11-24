"use client";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Colors from "../../constants/colors";

const NavItem = ({ icon, children, href, ...rest }: any) => {
  const location = useLocation();
  const isSelected = location.pathname.includes(href);

  return (
    <Box
      as={Link}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      w="100%" // Ensure the Box stretches to full width
    >
      <Flex
        align="center"
        p="2"
        mt={"1"}
        h="40px"
        role="group"
        w="100%"
        cursor="pointer"
        fontSize="sm"
        borderRadius={"5px"}
        bg={"#fff"}
        color={isSelected ? "#3381F7" : "#9A9AA9"}
        _hover={{
          bg: Colors.PRIMARY[100],
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text fontWeight={isSelected ? "400" : "normal"}>{children}</Text>
      </Flex>
    </Box>
  );
};

export default NavItem;
