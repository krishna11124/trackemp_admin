import React, { useState } from "react";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  useDisclosure,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  Box,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";
import { LinkItems } from "../../layout/data";
import Colors from "../../constants/colors";
import useMessageStore from "../../zustand/messageStore";
import github from "../../assets/github.png";
import { MdExitToApp } from "react-icons/md";

const Sidebar: React.FC = () => {
  const [navSize, setNavSize] = useState<"small" | "large">("large");
  const { setMessage } = useMessageStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use breakpoint value to conditionally render Drawer or Sidebar
  const showDrawer = useBreakpointValue({ base: true, md: false });

  const mainLinkItems = LinkItems.filter(
    (link) => link.name !== "Docs" && link.name !== "Log Out"
  );
  const docsItem = LinkItems.find((link) => link.name === "Docs");
  const logOutItem = LinkItems.find((link) => link.name === "Log Out");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setMessage("Logged out successfully");
  };

  const handleCollapse = () => {
    setNavSize(navSize === "small" ? "large" : "small");
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      {!isOpen && (
        <IconButton
          display={{ base: "flex", md: "none" }} 
          aria-label="Open Sidebar"
          icon={<HamburgerIcon />}
          fontSize="md"
          onClick={onOpen}
          bg="#f4f4f5"
          borderRadius="8px"
          position="absolute"
          top="4"
          right="4"
          zIndex="tooltip"
        />
      )}

      {/* Sidebar for Desktop */}
      {!showDrawer && (
        <Flex
          pos="sticky"
          top="0px"
          h="100vh"
          backgroundColor={Colors.PRIMARY[300]}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          w={{ base: "100%", md: navSize === "small" ? "75px" : "270px" }}
          flexDir="column"
          justifyContent="space-between"
          display={{ base: "none", md: "flex" }}
        >
          {/* Sidebar content */}
          <Flex
            pt="4"
            px="6"
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
            as="nav"
          >
            <Flex
              direction="row"
              align="center"
              justify="left"
              flex="1"
              cursor="pointer"
              pb={3}
            >
              <Box ml="3">
                <Text fontWeight="bold">Track EMP</Text>
              </Box>
            </Flex>

            {mainLinkItems.map((link) => (
              <NavItem key={link.name} icon={link.icon} href={link.href}>
                {navSize === "large" ? link.name : null}
              </NavItem>
            ))}
            {docsItem && (
              <NavItem
                key={docsItem.name}
                icon={docsItem.icon}
                href={docsItem.href}
              >
                {navSize === "large" ? docsItem.name : null}
              </NavItem>
            )}
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center" 
            flex="1"
            cursor="pointer"
          >
            {logOutItem && (
              <Flex
                key={logOutItem.name}
                as="a"
                href={logOutItem.href}
                mt="3"
                alignItems="center"
                cursor="pointer"
                fontSize="sm"
                onClick={() => {
                  handleLogout()
                }}
              >
                {navSize === "large" && <Text>{logOutItem.name}</Text>}{" "}
                <Box
                  as={logOutItem.icon}
                  ml={navSize === "large" ? "2" : "0"}
                />{" "}
              </Flex>
            )}
          </Flex>
        </Flex>
      )}

      {/* Drawer for Mobile */}
      {showDrawer && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="full">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton
                bg="#f4f4f5"
                color="#000"
                p="4"
                fontSize="sm"
                position="absolute"
                right="8"
                top="5"
              />
              <DrawerHeader pb={1}>
                <Flex
                  direction="row"
                  align="center"
                  justify="left"
                  flex="1"
                  cursor="pointer"
                >
                  <Avatar size="md" src="avatar-1.jpg" />
                  <Heading as="h6" ml={3} size="md" textAlign="center">
                    User
                  </Heading>
                  {/* <UpDownIcon boxSize={4} ml="10" /> */}
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Flex flexDir="column" p="0%" alignItems="flex-start">
                  {mainLinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon} href={link.href}>
                      {link.name}
                    </NavItem>
                  ))}
                  <Divider my={4} />
                  {docsItem && (
                    <NavItem
                      key={docsItem.name}
                      icon={docsItem.icon}
                      href={docsItem.href}
                    >
                      {docsItem.name}
                    </NavItem>
                  )}
                  {logOutItem && (
                    <NavItem
                      key={logOutItem.name}
                      icon={logOutItem.icon}
                      href={logOutItem.href}
                      onClick={handleLogout}
                    >
                      {logOutItem.name}
                    </NavItem>
                  )}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
