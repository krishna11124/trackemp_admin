import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import CustomText from "../../../components/Topography/Text";
import Colors from "../../../constants/colors";
import formatDate from "../../../hooks/getDate";
import { Employees, companyColumn } from "./data";
import { FaTrash } from "react-icons/fa";

interface EmployeesTableProps {
  empData: Employees[];
  handleDelete: (empID: string) => void;
  handleUpdateStatus: (empID: string, status: boolean) => void;
}

const EmployeeTable: React.FC<EmployeesTableProps> = ({
  empData,
  handleDelete,
  handleUpdateStatus,
}) => {
  return (
    <Table variant="striped" colorScheme="primary" w="130vh">
      <Thead>
        <Tr>
          {companyColumn.map((column) => (
            <Th
              key={column.key}
              {...tableHeaderStyle}
              color={Colors.PRIMARY[300]}
              backgroundColor={Colors.PRIMARY[200]}
            >
              {column.label}
            </Th>
          ))}
          <Th
            {...tableHeaderStyle}
            color={Colors.PRIMARY[300]}
            backgroundColor={Colors.PRIMARY[200]}
          >
            Status
          </Th>
          <Th
            {...tableHeaderStyle}
            color={Colors.PRIMARY[300]}
            backgroundColor={Colors.PRIMARY[200]}
          >
            Action
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {empData.map((user, index) => (
          <Tr key={index}>
            {companyColumn.map((column) => (
              <Td key={column.key} {...tableHeaderStyle}>
                {column.key === "name" ? (
                  <HStack spacing={2}>
                    <CustomText>{user[column.key]}</CustomText>
                  </HStack>
                ) : column.key === "createdAt" ? (
                  formatDate(user[column.key] as string)
                ) : column.key === "status" ? (
                  user[column.key] ? (
                    "Yes"
                  ) : (
                    "No"
                  )
                ) : (
                  user[column.key]
                )}
              </Td>
            ))}
            <Td {...tableHeaderStyle}>
              <Switch
                isChecked={user.status}
                onChange={() => handleUpdateStatus(user._id, !user.status)}
                colorScheme="teal"
              />
            </Td>
            <Td {...tableHeaderStyle}>
              <IconButton
                aria-label="Delete Company"
                icon={<FaTrash />}
                colorScheme="red"
                onClick={() => handleDelete(user._id)}
                size="sm"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const tableHeaderStyle = {
  fontFamily: "Urbanist",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "17px",
  px: 5,
  py: 3,
};

export default EmployeeTable;
