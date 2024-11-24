import { Avatar, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from './Topography/Text'

function ImageAndName({src, name }: {src: string , name:string }) {
  return (
    <HStack spacing={2}>
    <Image src={src} width={'28px'} height={'28px'} rounded="md"  />
    <CustomText>{name}</CustomText>
  </HStack>  )
}

export default ImageAndName