import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { SiJira } from "react-icons/si";
import Colors from "../../constants/colors";
import loginimg from "../../assets/login_logo.png";
import * as Yup from "yup";
import Input from "../../components/input";
import useMessageStore from "../../zustand/messageStore";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import useLoadingStore from "../../zustand/globalLoadingState";
import useAxios, { Base_Url } from "../../hooks/api";
import axios from "axios";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { setError, setMessage } = useMessageStore();
  const { client, updateToken } = useAxios();
  const { loading, setLoading } = useLoadingStore();

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    await axios
      .post(Base_Url + "login", values)
      .then((res) => {
        if (res?.data?.data && res?.data?.status) {
          localStorage.setItem("token", res?.data.token);
          localStorage.setItem("@userName", res?.data?.data?.companyName);
          localStorage.setItem("@userData", res?.data.data);
          updateToken(res?.data?.token);
          setMessage("Logged in successfully");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{ userSelect: "none" }}
      w="100%"
      h="100vh"
      // background="#E8E8E8"
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        spacing={8}
        height="100vh"
        // background="red"
      >
        {/* Left side illustration */}
        <Box
          display={{ base: "flex", md: "block" }}
          justifyContent="center"
          width={{ base: "100%", md: "50%" }}
        >
          <Box as="img" src={loginimg} alt="Login Illustration" width="80%" />
        </Box>

        {/* Right side with heading and login button */}
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="md"
          textAlign="center"
          width={{ base: "100%", md: "450px" }}
        >
          <Heading mb={6} size="lg">
            Welcome to <br />{" "}
            <Text color={Colors.PRIMARY[700]} fontWeight={800}>
              {" "}
              TRACK EMP
            </Text>
          </Heading>

          <Formik
            initialValues={{
              email: "Krishna@dditsolutions.com",
              password: "123456",
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormControl>
                  <FormLabel fontSize={["12px", "14px", "16px"]}>
                    Enter your Email
                  </FormLabel>
                  {/* Use Field component for input fields */}
                  <Field
                    as={Input}
                    fontFamily={"Urbanist"}
                    placeholder="Enter your Email"
                    name="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <Text color="secondary.900" my={2} textAlign="left">
                        {msg}
                      </Text>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel fontSize={["12px", "14px", "16px"]}>
                    Password
                  </FormLabel>
                  {/* Use Field component for input fields */}
                  <Field
                    as={Input}
                    fontFamily={"Urbanist"}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <Text color={"secondary.900"} mt={2} textAlign="left">
                        {msg}
                      </Text>
                    )}
                  </ErrorMessage>
                </FormControl>

                {/* Use Button within Formik to handle submission */}
                <Button
                  fontFamily={"Urbanist"}
                  colorScheme="primary"
                  w="full"
                  py={"8"}
                  mt="12"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
