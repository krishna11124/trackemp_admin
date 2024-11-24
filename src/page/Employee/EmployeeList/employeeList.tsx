import { Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";
import CustomText from "../../../components/Topography/Text";
import Colors from "../../../constants/colors";
import formatDate from "../../../hooks/getDate";
import { Employees, companyColumn } from "./data";

interface EmployeesTableProps {
  empData: Employees[];
}

const EmployeeTable: React.FC<EmployeesTableProps> = ({ empData }) => {
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
