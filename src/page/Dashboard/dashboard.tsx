import React from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Select,
  Textarea,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  useFormikContext,
} from "formik"; // Import Formik components
import * as Yup from "yup";
import Input from "../../components/input";
import CustomText from "../../components/Topography/Text";
import CustomHeading2 from "../../components/Topography/Heading2";
import CustomHeading from "../../components/Topography/Heading1";
import useMessageStore from "../../zustand/messageStore";
import useAxios, { Base_Url } from "../../hooks/api";
import { error } from "console";
import useLoadingStore from "../../zustand/globalLoadingState";
import axios from "axios";

interface FormValues {
  empName: string;
  empEmail: string;
  emailPassword: string;
}

const schema = Yup.object().shape({
  empName: Yup.string().required("Employee Name is required"),
  empEmail: Yup.string().required("Employee Email is required"),
  emailPassword: Yup.string().required("Employee Password is required"),
});

const CreateEmployee = () => {
  const { setError, setMessage } = useMessageStore();
  const { client } = useAxios();
  const { loading, setLoading } = useLoadingStore();

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    const payload = {
      email: values?.empEmail,
      password: values?.emailPassword,
      name: values?.empName,
    };
    await axios
      .post(Base_Url + "createEmployee", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res?.data?.data && res?.data?.status) {
          setMessage("Employee Created successfully");
          resetForm();
        }
      })
      .catch((error) => {
        console.error("Employee Create failed:", error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box m="auto" bg={"white"} w="full" py={3} rounded={"10px"}>
      <CustomHeading
        fontFamily="Urbanist"
        fontSize={["20px", "24px", "28px"]}
        px={3}
        mt="4"
      >
        Create Employee
      </CustomHeading>

      <Formik
        initialValues={{
          empName: "",
          empEmail: "",
          emailPassword: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          isSubmitting,
          values,
          setSubmitting,
          resetForm,
          errors,
          isValid,
          validateForm,
          setErrors,
          setTouched,
        }) => (
          <Form>
            <SimpleGrid columns={2} mt="4" p="4" gap={4}>
              <Field name="empName">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.empName && form.touched.empName}
                  >
                    <FormLabel
                      htmlFor="empName"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Employee Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="empName"
                      placeholder="Enter Employee Name"
                    />
                    <FormErrorMessage>{form.errors.empName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="empEmail">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.empEmail && form.touched.empEmail}
                  >
                    <FormLabel
                      htmlFor="empEmail"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Employee Email
                    </FormLabel>
                    <Input
                      {...field}
                      id="empEmail"
                      placeholder="Enter Employee Email"
                    />
                    <FormErrorMessage>{form.errors.empEmail}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="emailPassword">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.emailPassword && form.touched.emailPassword
                    }
                  >
                    <FormLabel
                      htmlFor="emailPassword"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Employee Password
                    </FormLabel>
                    <Input
                      {...field}
                      id="emailPassword"
                      placeholder="Enter Employee Password"
                    />
                    <FormErrorMessage>
                      {form.errors.emailPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>

            <HStack w="full" justifyContent={"end"} gap="2" px="4">
              <Button
                fontFamily={"Urbanist"}
                colorScheme="red"
                variant={"outline"}
                onClick={() => window.history.back()}
                isLoading={isSubmitting}
                w={"162px"}
              >
                Cancel
              </Button>

              <Button
                w={"162px"}
                fontFamily={"Urbanist"}
                colorScheme="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateEmployee;
