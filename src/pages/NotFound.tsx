import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate()
  const backToBeranda = () =>{
    navigate('/beranda')
  }
  return (
    <Flex
      justify='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      bgColor='#EFEFEF'
      flexDir='column'>
      <Text color='#2A2A2A' fontSize='24px' fontWeight='bold'>
        Oups !! | Page Not Found
      </Text>
      <Text
        color='#3CA9DB'
        fontSize='18px'
        mt='10px'
        cursor='pointer'
        width='fit-content'
        fontWeight='bold'
        _hover={{
          color:"#2296CB"
        }}
        onClick={backToBeranda}
        >
        Back to Beranda
      </Text>
    </Flex>
  );
};
