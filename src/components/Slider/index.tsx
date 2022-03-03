import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import Slider from "react-slick";
import { InfoIcon } from "@chakra-ui/icons";
import { ModalActivity } from "../ModalActivity";
import { useEffect, useState } from "react";
import axios from "axios";
import { activitiesDetail, typeActivitiesData } from "../../types";
import moment from "moment";

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
  const [isOpen, setIsOpen] = useState(false);
  const [activitiesData, setActivitiesData] = useState<typeActivitiesData[]>();
  const [selectedActivities, setSelectedActivities] =
    useState<activitiesDetail>();
  const [selectedId, setSelectedId] = useState<number>(0);
  const idUser = localStorage.getItem("id");

  const handleOpen = (id: number) => {
    setSelectedId(id);
    axios
      .get(`/activities/${idUser}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        setSelectedActivities(data);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsOpen(true);
      });
  };
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    getAllActivities();
  }, []);

  const getAllActivities = () => {
    axios
      .get(`/activities/${idUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setActivitiesData(data);
        console.log(data);
      });
  };

  const handleRejectRequest = (id: number) => {
    axios
      .put(
        `/activities/${idUser}/${id}`,
        {
          status: "cancel",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        getAllActivities();
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsOpen(true);
      });
  };

  let settings = {
    className: "slider variable-width",
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box width='100%' className='slides' mt='20px' padding='0px 50px 0px 20px'>
      <Slider {...settings}>
        {activitiesData?.map((value, index) => (
          <Box
            key={value.id}
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
                  backgroundImage: `url(${value.asset_image})`,
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
                    {moment(value.request_date).format("h:mm a, DD MMM YYYY")}
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
                    {value.asset_name.length > 40
                      ? `${value.asset_name.substring(0, 40)}+...`
                      : `${value.asset_name}`}
                  </Text>
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
                  {value.status}
                </Text>
                <Tooltip label='Details' placement='top'>
                  <InfoIcon
                    onClick={() => handleOpen(value.id)}
                    cursor='pointer'
                    transition='all 0.3s ease'
                    _hover={{ color: "#222222" }}
                    _active={{ color: "#2A2A2A" }}
                  />
                </Tooltip>
              </Flex>
            </Box>
          </Box>
        ))}
      </Slider>
      <ModalActivity
        dataActivities={selectedActivities}
        isOpen={isOpen}
        onClose={handleClose}
        handleRejectReqEmployee={() => handleRejectRequest(selectedId)}
        role={1}
        status='Waiting approval'
      />
    </Box>
  );
}

export default SliderImage;
