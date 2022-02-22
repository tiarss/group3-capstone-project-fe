import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import { InfoIcon } from "@chakra-ui/icons";

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        marginRight: "0px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        marginLeft: "0px",
      }}
      onClick={onClick}
    />
  );
}

function SliderImage() {
  let settings = {
    className: "slider variable-width",
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    //  responsive: [
    //    {
    //      breakpoint: 1024,
    //      settings: {
    //        slidesToShow: 2,
    //        slidesToScroll: 1,
    //        infinite: true,
    //        arrows: false,
    //        dots: true,
    //      },
    //    },
    //    {
    //      breakpoint: 800,
    //      settings: {
    //        slidesToShow: 1,
    //        slidesToScroll: 1,
    //        initialSlide: 1,
    //        infinite: true,
    //        arrows: false,
    //        dots: true,
    //      },
    //    },
    //  ],
  };

  return (
    <Box width='100%' className='slides' mt='20px' padding="0px 50px 0px 20px">
      <Slider {...settings}>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          display='flex'
          justifyContent='center'
          padding='10px 20px'>
          <Box
            width='250px'
            height='175px'
            bgColor='white'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'>
            <Flex
              height='125px'
              padding='10px'
              position='relative'
              flexDir='column'
              justifyContent='end'
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://id.360buyimg.com/Indonesia/nHBfsgAAYwAAABkACvFW2gAKOCI.jpg)",
              }}>
              <Box>
                <Text
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='9px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  13:24 PM, 14 Feb 2022
                </Text>
                <Text
                  mt='5px'
                  fontWeight='semibold'
                  borderRadius='5px'
                  width='fit-content'
                  fontSize='12px'
                  textAlign='left'
                  padding='5px'
                  bgColor='white'>
                  Lenovo Thinkpad Yoga 370 Core i7 7600U Ge..
                </Text>
                {/* <Text
                borderRadius="5px"
                  width='fit-content'
                  fontSize='10px'
                  textAlign='right'
                  padding='5px'
                  bgColor='white'>
                  LP1330
                </Text> */}
              </Box>
            </Flex>
            <Flex
              height='50px'
              padding='10px'
              justifyContent='space-between'
              alignItems='center'>
              <Text
                borderRadius='5px'
                fontSize='12px'
                padding='5px 7px'
                fontWeight='semibold'
                bgColor='#EFEFEF'>
                Menunggu Permohonan
              </Text>
              <InfoIcon
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{ color: "red" }}
                _active={{ color: "blue" }}
              />
            </Flex>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
}

export default SliderImage;
