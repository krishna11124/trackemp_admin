import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Column, useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  HStack,
  Box,
  TagLeftIcon,
  TableContainer,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import Input from "../input";
import CustomHeading from "../Topography/Heading1";
import CustomText from "../Topography/Text";
import { FaAngleRight } from "react-icons/fa6";

import { FaAngleLeft } from "react-icons/fa6";
import useAxios from "../../hooks/api";
import useLoadingStore from "../../zustand/globalLoadingState";

const tableHeaderStyle = {
  fontFamily: "Urbanist",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "17px",

  px: 4,
  py: 2,
};

//TODO://Fix Pagenation Here
const MyTable = ({
  defaultPageSize = 10,
  heading,
  url,
  data,
  setData,
  columns,
  noDataMessage,
  search,
  handleRowClick,
}: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const initialPage = parseInt(queryParams.page as string, 10) || 1;
  const initialSearchInput = (queryParams.search as string) || "";
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const { loading, setLoading } = useLoadingStore();

  const { client } = useAxios();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const updateURLParams = () => {
      const data: {
        page?: number;
        search?: string;
      } = {};

      if (page !== 1) {
        data.page = page;
      }
      if (searchInput) {
        data.search = searchInput;
      }
      const params = queryString.stringify(data);
      if (params) navigate(`?${params}`);
    };

    const fetchData = async () => {
      try {
        // setLoading(true);
        // const response = await client.get(url, {
        //   params: {
        //     search: searchInput,
        //     pageNumber: page,
        //     pageSize: pageSize,
        //   },
        // });
        const response = await client.get(url);
        const { data: responseData } = response.data;
        setData(
          responseData.map((item: any, index: any) => ({
            sno: (page - 1) * defaultPageSize + 1 + index,
            ...item,
          })) || []
        );

        // setTotalPage(
        //   Math.ceil(pagination?.totalRecords / pagination?.pageSize)
        // );
        // setTotalCount(pagination.totalRecords);
        updateURLParams();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const debouncedFetchData = debounce(fetchData, 500);
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel(); // Cancel the debounce on component unmount
    };
  }, [client, defaultPageSize, navigate, page, searchInput, setData, url]);

  const handleSearchInputChange = (e: any) => {
    setPage(1);
    setSearchInput(e.target.value);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Flex
      direction="column"
      align="center"
      bg={"white"}
      rounded={"10px"}
      p="0"
      w="full"
    >
      {(heading !== false || heading) && (
        <HStack w={"full"} justifyContent={"space-between"} mb="3" zIndex={"1"}>
          {heading && (
            <CustomHeading
              fontFamily="Urbanist"
              fontSize={["20px", "24px", "28px"]}
              px={3}

            >
              {heading}
            </CustomHeading>
          )}
          {search !== false && (
            <Box w={"163px"}>
              <Input
                type="search"
                placeholder="Search..."
                value={searchInput}
                zIndex={"1"}
                onChange={handleSearchInputChange}
                bgColor={"rgba(250, 250, 251, 1)"}
                fontSize="12px"
              />
            </Box>
          )}
        </HStack>
      )}
      <TableContainer w={"full"} overflow={"auto"}>
        {data.length === 0 ? (
          <Flex justifyContent="center" alignItems="center" py={8}>
            <CustomText>{noDataMessage || "No data available"}</CustomText>{" "}
            {/* Use the passed noDataMessage or fallback */}
          </Flex>
        ) : (
          <Table {...getTableProps()} width={"max"} minW={"full"}>
            <Thead backgroundColor={"rgba(202, 222, 255, 1)"}>
              {headerGroups.map((headerGroup) => (
                <Tr
                  {...tableHeaderStyle}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr
                    {...tableHeaderStyle}
                    _hover={{ bg: "gray.50" }}
                    borderTop={"2px solid rgba(242, 242, 242, 1)"}
                    borderBottom={"2px solid rgba(242, 242, 242, 1)"}
                    {...row.getRowProps()}
                    onClick={() => handleRowClick && handleRowClick(row)}
                    cursor={handleRowClick && "pointer"}
                  >
                    {row.cells.map((cell) => (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      {/* <Flex
        mt={4}
        justifyContent={"space-between"}
        alignItems={"center"}
        w="full"
        flexWrap={"wrap"}
        gap={"2"}
      >
        <CustomText fontSize={"16px"}>
          Showing <b>{(page - 1) * defaultPageSize + 1}</b> to{" "}
          <b>
            {page * defaultPageSize > totalCount
              ? totalCount
              : page * defaultPageSize}
          </b>{" "}
          of <b>{totalCount}</b> results
        </CustomText>
        <HStack>
          <Button
            size={"sm"}
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
            isDisabled={page === 1}
            rounded={"none"}
            variant={"ghost"}
          >
            <FaAngleLeft />
          </Button>
          {
            <Button
              size={"sm"}
              onClick={() => setPage(page === 1 ? 1 : page - 1)}
              rounded={"none"}
              bgColor={page === 1 ? "black" : "transparent"}
              color={page === 1 ? "white" : "black"}
            >
              {page === 1 ? 1 : page - 1}
            </Button>
          }
          <Button
            size={"sm"}
            onClick={() => setPage(page === 1 ? 2 : page)}
            rounded={"3px"}
            bgColor={page === 1 ? "transparent" : "black"}
            color={page === 1 ? "black" : "white"}
            isDisabled={(page === 1 ? 2 : page) > totalPage}
          >
            {page === 1 ? 2 : page}
          </Button>
          <Button
            size={"sm"}
            onClick={() => setPage(page === 1 ? 3 : page + 1)}
            rounded={"none"}
            bgColor={"transparent"}
            isDisabled={(page === 1 ? 3 : page + 1) > totalPage}
          >
            {page === 1 ? 3 : page + 1}
          </Button>
          <Button
            size={"sm"}
            ml={2}
            onClick={() => setPage(page + 1)}
            rounded={"none"}
            variant={"ghost"}
            isDisabled={page >= totalPage}
          >
            <FaAngleRight />
          </Button>
        </HStack>
      </Flex> */}
    </Flex>
  );
};

export default MyTable;
