import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import Slider from "react-slick";
import slide from '../../assets/photoslide.png'
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        zIndex: "10",
        marginRight: "50px",
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
        zIndex: "10",
        marginLeft: "50px",
      }}
      onClick={onClick}
    />
  );
}

export default class SlideShow extends Component {
  render() {
    const settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000,
      speed: 1000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      appendDots: (
        dots:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => (
        <div>
          <ul style={{ marginBottom: "40px" }}> {dots} </ul>
        </div>
      ),
      cssEase: "linear",
    };
    return (
      <Box width='100%' className='slides' mt='5px'>
        <Slider {...settings}>
          <Box
            textAlign='center'
            display='flex'
            justifyContent='center'>
            <Flex
              flexDir='column'
              alignItems={{base:"center",md:'start'}}
              justifyContent='center'
              width='100%'
              height='200px'
              bgColor='white'
              padding="20px 70px"
              borderRadius='10px'>
              <Text fontSize="24px">Welcome to</Text>
              <Text fontSize="24px">Sirclo - Employee Assets Management</Text>
            </Flex>
          </Box>
          <Box
            textAlign='center'
            display='flex'
            justifyContent='center'>
            <Flex
              width='100%'
              height='200px'
              bgColor='white'
              justifyContent='center'
              overflow='hidden'
              borderRadius='10px'>
              <Image src={slide} h='100%' />
            </Flex>
          </Box>
        </Slider>
      </Box>
    );
  }
}
