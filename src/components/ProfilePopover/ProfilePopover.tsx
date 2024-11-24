import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/api";

const ProfilePopover = () => {
  const { client } = useAxios();
  const [profileData, setProfileData] = useState<any>([]);

  useEffect(() => {
    getProfileDetail();
  }, []);

  const getProfileDetail = async () => {
    try {
      const accountId = localStorage.getItem("accountId");
      await client
        .get("userProfile/" + accountId)
        .then((res: any) => {
          const { data } = res;
          console.log("data",data);
          
          if (data) {
            setProfileData(data?.data);
          }
        })
        .catch((error: any) => {
          console.error("Error in get profile failed:", error);
        });
    } catch (error) {
      console.log("Error in get profile detail", error);
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button variant="ghost" p={0}>
          <Flex alignItems="center">
            <Avatar src={profileData?.userProfilePic} />
            <Box ml="3" textAlign="left">
              <Text fontWeight="bold">{profileData?.nickname}</Text>
              <Text fontSize="sm">{profileData?.status}</Text>
            </Box>
            <ChevronDownIcon ml={2} />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent boxShadow="lg">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" borderBottomWidth="1px">
          Account Overview
        </PopoverHeader>
        <PopoverBody>
          <VStack align="start" spacing={3}>
            {/* User Info */}
            <HStack>
              <Avatar
                size="lg"
                name={profileData?.nickname}
                src={profileData?.userProfilePic}
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="lg">
                  {profileData?.nickname}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {profileData?.email}
                </Text>
              </VStack>
            </HStack>

            {/* Account Status */}
            <HStack>
              <Text fontWeight="bold">Account Status:</Text>
              <Tag size="md" colorScheme="green" variant="solid">
                {profileData?.accountStatus}
              </Tag>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
