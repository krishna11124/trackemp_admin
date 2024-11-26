import { useEffect, useState } from "react";
import WrapperCard from "../../components/Cards/WrapperCard";
import { Box } from "@chakra-ui/react";
import useLoadingStore from "../../zustand/globalLoadingState";
import axios from "axios";
import { Base_Url } from "../../hooks/api";
import useMessageStore from "../../zustand/messageStore";
import CustomHeading from "../../components/Topography/Heading1";
import EmployeeTable from "./EmployeeList/employeeList";
import { Employees } from "./EmployeeList/data";

function EmployeeList() {
  const { loading, setLoading } = useLoadingStore();
  const { setError, setMessage } = useMessageStore();
  const [empList, setEmpList] = useState<Employees[]>([]);

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    await axios
      .post(
        Base_Url + "getMyEmployee",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data && res?.data?.status) {
          setEmpList(res?.data?.data);
        }
      })
      .catch((error) => {
        console.error("Company Listing failed:", error);
        setError(error.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle the delete action
  const handleDelete = async (empId: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_Url}deleteMyEmoloyee`,
        { empId: empId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        setMessage("Employee deleted successfully!");
        setEmpList((prevData) =>
          prevData.filter((employee) => employee._id !== empId)
        );
      } else {
        setError(response?.data?.message || "Failed to delete the employee");
      }
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle the update status
  const handleUpdateStatus = async (empId: string, status: boolean) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_Url}updateStatus`,
        { empId: empId, status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        setMessage("Employee status updated successfully!");
        setEmpList((prevData) =>
          prevData.map((employee) =>
            employee._id === empId ? { ...employee, status: status } : employee
          )
        );
      } else {
        setError(response?.data?.message || "Failed to update employee status");
      }
    } catch (error: any) {
      console.error("Error updating employee status:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperCard>
      <CustomHeading
        fontFamily="Urbanist"
        fontSize={["20px", "24px", "28px"]}
        px={3}
      >
        Employees List
      </CustomHeading>
      <Box mt={12}>
        <EmployeeTable
          empData={empList}
          handleDelete={handleDelete}
          handleUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </WrapperCard>
  );
}

export default EmployeeList;
