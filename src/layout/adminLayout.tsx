import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  calc,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Input from "../components/input";
import { Link, useLocation, useParams } from "react-router-dom";
import { LinkItems } from "./data";
import useMessageStore from "../zustand/messageStore";
import { useEffect } from "react";

const SidebarContent = ({ onClose, ...rest }: any) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={" 0px 6px 4px 0px rgba(222, 246, 255, 0.17)"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="max-content"
      minH={"full"}
      {...rest}
      overflowY={"auto"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box ml="3">
          <Text fontWeight="bold">Track EMP</Text>
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, links, ...rest }: any) => {
  const param = useParams();
  const location = useLocation();
  if (Array.isArray(links) && links.length > 0) {
    return (
      <>
        <Box
          as={Link}
          to={href}
          display={["none", "block"]}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            p="4"
            role="group"
            cursor="pointer"
            bg={
              location.pathname.includes(href)
                ? "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)"
                : "white"
            }
            color={location.pathname.includes(href) ? "black" : "primary.400"}
            _hover={{
              bg: "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)",
              color: "black",
            }}
            transition={"ease-in-out"}
            transitionDuration={"2000"}
            transitionDelay={"2000"}
            {...rest}
          >
            {icon && <Icon mr="4" fontSize="16" as={icon} />}
            {children}
          </Flex>
        </Box>

        <Accordion allowMultiple display={["block", "none"]}>
          <AccordionItem w={"full"} p="0">
            <h2>
              <AccordionButton w={"full"} p={0} border={"none"}>
                <Flex
                  align="center"
                  p="4"
                  role="group"
                  cursor="pointer"
                  bg={
                    location.pathname.includes(href)
                      ? "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)"
                      : "white"
                  }
                  color={
                    location.pathname.includes(href) ? "black" : "primary.400"
                  }
                  _hover={{
                    bg: "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)",
                    color: "black",
                  }}
                  transition={"ease-in-out"}
                  transitionDuration={"2000"}
                  transitionDelay={"2000"}
                  {...rest}
                  display={"flex"}
                  w={"full"}
                  justifyContent={"space-between"}
                >
                  <Flex>
                    {icon && <Icon mr="4" fontSize="16" as={icon} />}
                    {children}
                  </Flex>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              w="full"
              display={"flex"}
              gap={"0"}
              flexDirection={"column"}
              p="0"
            >
              {links.map((link, index) => (
                <Box
                  key={index}
                  as={Link}
                  to={link.href}
                  w="full"
                  style={{ textDecoration: "none" }}
                  align="center"
                  p="2"
                  px={10}
                  role="group"
                  cursor="pointer"
                  bg={
                    location.pathname.includes(link)
                      ? "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)"
                      : "white"
                  }
                  color={
                    location.pathname.includes(link) ? "black" : "primary.400"
                  }
                  _hover={{
                    bg: "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)",
                    color: "black",
                  }}
                  transition={"ease-in-out"}
                  transitionDuration={"2000"}
                  transitionDelay={"2000"}
                  {...rest}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  {link.name}
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  return (
    <Box
      as={Link}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        bg={
          location.pathname.includes(href)
            ? "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)"
            : "white"
        }
        color={location.pathname.includes(href) ? "black" : "primary.400"}
        _hover={{
          bg: "linear-gradient(90deg, rgba(52, 128, 249, 0.1) 0%, rgba(213, 229, 255, 0.10) 50.9%)",
          color: "black",
        }}
        transition={"ease-in-out"}
        transitionDuration={"2000"}
        transitionDelay={"2000"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: any) => {
  const { setError, setMessage } = useMessageStore();

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setMessage("logged out successfully");
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      position={"sticky"}
      zIndex={["unset", "9000"]}
      top={0}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      boxShadow={" 0px 6px 4px 0px rgba(222, 246, 255, 0.17)"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack
        spacing={{ base: "0", md: "2" }}
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          alignItems={"center"}
          w={"fit-content"}
          display={["hidden", "flex"]}
        >
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack alignItems="center">
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" w="150px">
                    Welocme, {localStorage.getItem("@userName")}
                  </Text>
                  <Text fontSize="xs" color="gray.600" w="150px">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuDivider position={"relative"} zIndex={"99999"} />
              <MenuItem
                position={"relative"}
                zIndex={"99999"}
                onClick={signout}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      fontFamily={"Urbanist"}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent zIndex={"9000"} h={"100vh"} overflowY={"auto"}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        p="5"
        w={{
          base: "full",
          md: "calc(100% - 15rem)",
        }}
        h={{
          base: "auto",
          md: "calc(100% - 5rem)",
        }}
        overflowY={"auto"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
