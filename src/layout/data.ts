import { MdExitToApp } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
//Home
import Dashboard from "../page/Dashboard/dashboard";
import EmployeeList from "../page/Employee/employee";

export const LinkItems = [
  {
    name: "Create Employees",
    icon: VscOrganization,
    href: "/dashboard",
    Component: Dashboard,
  },
  {
    name: "Employee List",
    icon: VscOrganization,
    href: "/employeeList",
    Component: EmployeeList,
  },
];
