import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import CustomText from './Topography/Text'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function BackToList({value}:any) {
    const navigate = useNavigate();

  return (
    <Button color='rgba(141, 141, 141, 1)' rounded={'3px'} p={'1px'} w={'auto'} _hover={{backgroundColor:"none"}} onClick={()=> navigate(value || -1)}><FaAngleLeft /> <CustomText ml= "2" color='rgba(141, 141, 141, 1)'>Back to list</CustomText></Button>
  )
}

export default BackToList