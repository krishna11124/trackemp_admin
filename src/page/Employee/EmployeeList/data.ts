export interface Employees {
  _id: string;
  status: boolean;
  email: string;
  password: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface columnsSchema {
  label: string;
  key: keyof Employees;
}

export const companyColumn: columnsSchema[] = [
  {
    label: "Employee Name",
    key: "name",
  },
  {
    label: "Employee Email",
    key: "email",
  },
  {
    label: "Create AT",
    key: "createdAt",
  },

  {
    label: "Active",
    key: "status",
  },
];
