import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResumeCard = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    available: 0,
    borrowed: 0,
    total_asset: 0,
    under_maintenance: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    setIsLoading(true);
    axios
      .get("/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setStats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        const { data } = err.response;
        console.log(data);
        if (data.message === "invalid or expired jwt") {
          localStorage.setItem("token", "");
          localStorage.setItem("expired", "");
          localStorage.setItem("role", "");
          localStorage.setItem("id", "");
          localStorage.setItem("isAuth", JSON.stringify(false));
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in")
        }
      });
  };

  return (
    <>
      <Box
        width={{ base: "25%", lg: "50%" }}
        display='flex'
        flexDirection='column'
        padding='10px'>
        <Text fontWeight='bold' fontSize={{base:"26px",md:'32px'}}>
          {stats.total_asset}
        </Text>
        <Text fontWeight='semibold' fontSize={{base:"12px", md:"14px"}}>Total Aset</Text>
      </Box>
      <Box
        width={{ base: "25%", lg: "50%" }}
        display='flex'
        flexDirection='column'
        padding='10px'>
        <Text fontWeight='bold' fontSize={{base:"26px",md:'32px'}}>
          {stats.under_maintenance}
        </Text>
        <Text fontWeight='semibold' fontSize={{base:"12px", md:"14px"}}>Pemeliharaan</Text>
      </Box>
      <Box
        width={{ base: "25%", lg: "50%" }}
        display='flex'
        flexDirection='column'
        padding='10px'>
        <Text fontWeight='bold' fontSize={{base:"26px",md:'32px'}}>
          {stats.borrowed}
        </Text>
        <Text fontWeight='semibold' fontSize={{base:"12px", md:"14px"}}>Digunakan</Text>
      </Box>
      <Box
        width={{ base: "25%", lg: "50%" }}
        display='flex'
        flexDirection='column'
        padding='10px'>
        <Text fontWeight='bold' fontSize={{base:"26px",md:'32px'}}>
          {stats.available}
        </Text>
        <Text fontWeight='semibold' fontSize={{base:"12px", md:"14px"}}>Tersedia</Text>
      </Box>
    </>
  );
};
