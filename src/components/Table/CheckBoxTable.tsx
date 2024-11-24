import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { Column, useTable } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Button, HStack, Box, Checkbox, TableContainer, Alert, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { debounce } from 'lodash';
import Input from '../input';
import CustomHeading from '../Topography/Heading1';
import CustomText from '../Topography/Text';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import useAxios from '../../hooks/api';
import { FaCheck, FaMinus } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import CustomHeading2 from '../Topography/Heading2';
import useMessageStore from '../../zustand/messageStore';
import { IoClose } from 'react-icons/io5';
import useLoadingStore from '../../zustand/globalLoadingState';

const tableHeaderStyle = {
  fontFamily: 'Urbanist',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '17px',
  px: 4,
  py: 2,
};

const MyTable = ({ defaultPageSize = 10, heading, url = '/admin/manage-subscription/get', data, setData, columns, search, handleRowClick, selected, setSelected, toDelete, setToDelete, deleteApi = '/admin/doctor/delete', createLink, deleteManyApi = "/admin/manage-subscription/delete-many" }: any) => {

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const initialPage = parseInt(queryParams.page as string, 10) || 1;
  const initialSearchInput = queryParams.search as string || '';

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const { client } = useAxios();
  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    const updateURLParams = () => {
      const data: { page?: number; search?: string } = {};

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
      setLoading(true)
      try {
        const res = await client.get(`${url}?item=${defaultPageSize}&pages=${page}&search=${searchInput}`);
        setData(
          res?.data?.data.map((item: any, index: any) => ({ sno: (page - 1) * defaultPageSize + 1 + index, ...item })) || []
        );
        setTotalPage(res?.data?.pages);
        setTotalCount(res?.data?.count);
        updateURLParams();
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setLoading(false)
      }
    };

    const debouncedFetchData = debounce(fetchData, 500);
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel(); // Cancel the debounce on component unmount
    };
  }, [client, defaultPageSize, navigate, page, searchInput, setData, url]);


  const handleSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
    setPage(1)
  };




  const updateURLParams = () => {
    const data: { page?: number; search?: string } = {};

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
      const res = await client.get(`${url}?item=${defaultPageSize}&pages=${page}&search=${searchInput}`);
      setData(
        res?.data?.data.map((item: any, index: any) => ({ sno: (page - 1) * defaultPageSize + 1 + index, ...item })) || []
      );
      setTotalPage(res?.data?.pages);
      setTotalCount(res?.data?.count);
      updateURLParams();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const onSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allIds = data.map((i: any) => i._id);
    setSelected(selected.length === 0 ? allIds : []);
  };

  const { setMessage, setError } = useMessageStore();



  const handleDeleteConfirm = async () => {
setLoading(true)

    try {
      await client.delete(`${deleteApi}/${toDelete}`);
      setMessage("deleted successfully.");
      setToDelete(undefined);
      fetchData();
    } catch (error: any) {
      setError(error?.response?.message || "Failed to delete.");
      setToDelete(undefined);

      fetchData()
    }
    setLoading(false)

  }
  const handleDeleteAllConfirm = async () => {
    setLoading(true)
    try {
      await client.post(`${deleteManyApi}`, {
        ids: selected
      });
      setMessage("deleted successfully.");
     
      fetchData();
    } catch (error: any) {
      setError(error?.response?.message || "Failed to delete.");
      fetchData()
    }finally{
      setSelected([]);
      setModal(false);
      setLoading(false)

    }

  }


  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const modalCancelRef = React.useRef<HTMLButtonElement>(null);


  const onCloseAlert = () => setToDelete(undefined);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const [modal, setModal] = useState(false);

  return (
    <Flex direction="column" align="center" bg={'white'} rounded={'10px'} p="0" w="full">


      {
        <AlertDialog
          isOpen={!!toDelete}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
          isCentered
        >
          <AlertDialogOverlay zIndex={'9006'}>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {heading}
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete this {heading}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      }


      {
        <AlertDialog
          isOpen={modal}
          leastDestructiveRef={modalCancelRef}
          onClose={() => setModal(false)}
          isCentered
        >
          <AlertDialogOverlay zIndex={'100000000000000000'}>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete {heading}
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete this {heading}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={modalCancelRef} onClick={() => setModal(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteAllConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

      }

      {(heading !== false || heading) && (
        <HStack w={'full'} justifyContent={'space-between'} mb="3" zIndex={'1'}>
          {heading && (
            <CustomHeading>
              {heading}
            </CustomHeading>
          )}
          <HStack>
            {(search !== false) && (
              <Box w={'163px'}>
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchInput}
                  zIndex={'1'}
                  onChange={handleSearchInputChange}
                  bgColor={"rgba(250, 250, 251, 1)"}
                  fontSize='12px'
                />
              </Box>

            )}
            {createLink && <Button fontFamily={'Urbanist'} as={Link} to={createLink as string} colorScheme="primary" py={'6'} w={['auto', '142px']}  >Create New</Button>
            }          </HStack>
        </HStack>
      )}
      {selected.length > 0 && (<Alert bgColor={'rgba(240, 245, 250, 1)'} p="1" display={'flex'} justifyContent={'space-between'}>
        <HStack>
          <IconButton variant={'ghost'} aria-label="close" onClick={() => setSelected([])}>
            <IoClose />
          </IconButton>
          <CustomHeading2>
            {selected.length} item(s) selected
          </CustomHeading2>
        </HStack>
        <Button variant={'ghost'} colorScheme="red" color="rgba(247, 85, 85, 1)" aria-label='delete selected'>
          <MdOutlineDelete size={'22px'} />

          <CustomHeading2 ml="1" onClick={() => setModal(true)} >
            Delete
          </CustomHeading2>
        </Button>
      </Alert>)}
      <TableContainer w={'full'} overflow={'auto'}>
        <Table {...getTableProps()} width={'max'} minW={'full'}>
          <Thead backgroundColor={'rgba(202, 222, 255, 1)'}>
            {headerGroups.map((headerGroup:any) => (
              <Tr {...tableHeaderStyle} {...headerGroup.getHeaderGroupProps()}>
                <Th>
                  <Checkbox
                    bg={'white'}
                    outlineColor={'black'}
                    isChecked={selected.length === data.length}
                    isIndeterminate={selected.length > 0 && selected.length < data.length}
                    onChange={onSelectAll}
                    icon={
                      selected.length === data.length ? (
                        <FaCheck />
                      ) : selected.length > 0 ? (
                        <FaMinus />
                      ) : undefined
                    }
                  />

                </Th>
                {headerGroup.headers.map((column:any) => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr
                  {...tableHeaderStyle}
                  _hover={{ bg: 'gray.50' }}
                  borderTop={'2px solid rgba(242, 242, 242, 1)'}
                  borderBottom={'2px solid rgba(242, 242, 242, 1)'}
                  {...row.getRowProps()}
                  onClick={() => (handleRowClick && handleRowClick(row))}
                // cursor={handleRowClick && 'pointer'}
                >
                  <Td onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      bg={'white'}
                      outlineColor={'black'}
                      isChecked={selected.includes((row.original as { _id: string })._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        const id = (row.original as { _id: string })._id;
                        setSelected((prevSelected: string[]) =>
                          prevSelected.includes(id)
                            ? prevSelected.filter((selectedId: string) => selectedId !== id)
                            : [...prevSelected, id]
                        );
                      }}
                    />
                  </Td>
                  {row.cells.map(cell => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex mt={4} justifyContent={'space-between'} alignItems={'center'} w="full" flexWrap={'wrap'} gap={'2'}>
        <CustomText fontSize={'16px'}>
          Showing <b>{(page - 1) * defaultPageSize + 1}</b> to <b>{(page * defaultPageSize) > totalCount ? totalCount : page * defaultPageSize}</b> of <b>{totalCount}</b> results
        </CustomText>
        <HStack>
          <Button size={'sm'} onClick={() => setPage(page === 1 ? 1 : page - 1)} isDisabled={page === 1} rounded={'none'} variant={'ghost'}>
            <FaAngleLeft />
          </Button>
          {<Button size={'sm'} onClick={() => setPage(page === 1 ? 1 : page - 1)} rounded={'none'} bgColor={page === 1 ? 'black' : 'transparent'} color={page === 1 ? 'white' : 'black'}>
            {page === 1 ? 1 : page - 1}
          </Button>}
          <Button size={'sm'} onClick={() => setPage(page === 1 ? 2 : page)} rounded={'3px'} bgColor={page === 1 ? 'transparent' : 'black'} color={page === 1 ? 'black' : 'white'} isDisabled={(page === 1 ? 2 : page) > totalPage}>
            {page === 1 ? 2 : page}
          </Button>
          <Button size={'sm'} onClick={() => setPage(page === 1 ? 3 : page + 1)} rounded={'none'} bgColor={'transparent'} isDisabled={(page === 1 ? 3 : page + 1) > totalPage}>
            {page === 1 ? 3 : page + 1}
          </Button>
          <Button size={'sm'} ml={2} onClick={() => setPage(page + 1)} rounded={'none'} variant={'ghost'} isDisabled={page >= totalPage}>
            <FaAngleRight />
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default MyTable;
