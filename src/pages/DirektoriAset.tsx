import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDetail from "../components/DetailCard";
import { Header } from "../components/Header";
import { InputSelect, InputSelectStatus, Search } from "../components/Input";
import ModalDetailAsset from "../components/Modal/detail-asset";
import { MaintenanceContext } from "../helper/MaintenanceContext";

const category = [
  { id: 0, name: "All", value: "" },
  { id: 1, name: "Computer", value: "Computer" },
  { id: 2, name: "Computer Accessories", value: "Computer-Accessories" },
  { id: 3, name: "Networking", value: "Networking" },
  { id: 4, name: "UPS", value: "UPS" },
  { id: 5, name: "Printer and Scanner", value: "Printer-and-Scanner" },
  { id: 6, name: "Electronics", value: "Electronics" },
  { id: 7, name: "Others", value: "Others" },
];

const status = [
  { id: 0, name: "All", value: "all" },
  { id: 1, name: "Tersedia", value: "available" },
];

const DirektoriAset = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [asset, setAsset] = useState<any[]>([]);
  const [details, setDetails] =
    useState<{
      category: string;
      description: string;
      image: string;
      name: string;
      total_asset: number;
    }>();
  const [categoryHistory, setCategoryHistory] = useState<string>("");
  const [nameHistory, setNameHistory] = useState<string>("");
  const [imageHistory, setImageHistory] = useState<string>("");
  const [usersHistory, setUsersHistory] = useState<any[]>([]);
  const [isMaintained, setIsMaintained] = useState<boolean>(false);
  const { Maintained, setMaintained } = useContext(MaintenanceContext);
  const [shortName, setShortName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("isAuth", JSON.stringify(false));
  };

  let roles = localStorage.getItem("role");

  useEffect(() => {
    if (roles === "Manager") {
      navigate("not-found");
    } else {
      fetchDataAset();
    }
  }, []);

  const fetchDataAset = () => {
    axios
      .get("/assets", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        setAsset(data);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleDetail = (short_name: string) => {
    setShortName(short_name);
    axios
      .get(`/assets/${short_name}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        setDetails(data);
        handleHistory(short_name);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      })
      .finally(() => {
        setIsOpen(true);
      });
  };

  const handleHistory = (short_name: string) => {
    axios
      .get(`/histories/assets/${short_name}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        setCategoryHistory(data.category);
        setNameHistory(data.asset_name);
        setImageHistory(data.asset_image);
        setUsersHistory(data.users);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleClose = () => {
    setIsOpen(false);
    setShortName("");
    setDetails({
      category: "",
      description: "",
      image: "",
      name: "",
      total_asset: 0,
    });
  };

  const handleMaintenance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setIsMaintained(value);
    setMaintained(value);
  };

  const handleUpdate = (short_name: string) => {
    axios
      .put(
        `/assets/${short_name}`,
        {
          under_maintenance: isMaintained,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        const { data } = res;
        if (data.message === "success update asset status") {
          toast({
            title: "Anda Berhasil Mengubah Status Aset",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        if (data.message === "asset not found") {
          toast({
            title: "Aset tidak ditemukan",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    axios
      .get(`/assets?category=${value}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        setAsset(data);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
      });
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
    axios
      .get(`/assets?status=${value}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const { data } = res.data;
        setAsset(data);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          logOut();
          toast({
            title: `Sign In Expired`,
            description: "Please re-Sign In",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate("/sign-in");
        }
        fetchDataAset();
      });
  };

  return (
    <>
      <Header />
      <Box bg='#EFEFEF' paddingBottom={9}>
        <Flex align='center' justify='center'>
          <Text fontSize='xl' fontWeight='bold' mt={7}>
            Direktori Aset
          </Text>
        </Flex>
        <Search
          data={category}
          value={selectedCategory}
          onChangeSearch={handleSearch}
          onChangeSelect={handleSelect}
        />
        <Flex align='center' justify='center' mt={50}>
          <Box
            bg='white'
            width={1080}
            maxHeight={605}
            borderRadius={7}
            shadow='xl'
            overflowY='scroll'>
            <Flex align='center' justify='center' mt={50}>
              <Box width={["55%", "70%", "90%"]}>
                <Flex
                  align='center'
                  justify='end'
                  marginEnd={2}
                  marginBottom={5}>
                  <Text
                    style={{ fontWeight: "bold", fontSize: "14px" }}
                    marginRight={2}>
                    Status :
                  </Text>
                  <InputSelectStatus
                    placeholder=''
                    size='xs'
                    value={selectedStatus}
                    onChange={handleStatus}
                    data={status}
                    isDisabled={false}
                  />
                </Flex>
                <Wrap spacing='50px'>
                  {asset
                    .filter(
                      (el) =>
                        el.name.toLowerCase().includes(search.toLowerCase()) ||
                        el.description
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((item: any) => (
                      <CardDetail
                        key={item.short_name}
                        backgroundImage={item.image}
                        kategori={item.category}
                        name={item.name}
                        deskripsi={item.description}
                        pengguna={item.user_count}
                        stok={item.stock_available}
                        onClick={() => handleDetail(item.short_name)}
                      />
                    ))}
                </Wrap>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <ModalDetailAsset
          isOpen={isOpen}
          onClose={handleClose}
          nama={details?.name}
          total_aset={details?.total_asset}
          deskripsi={details?.description}
          kategori={details?.category}
          backgroundimage={details?.image}
          category={categoryHistory}
          asset_name={nameHistory}
          asset_image={imageHistory}
          users={usersHistory}
          onChangeUpdate={handleMaintenance}
          onClickUpdate={() => handleUpdate(shortName)}
        />
      </Box>
    </>
  );
};
export default DirektoriAset;

// {data
//     .filter(
//       (el) =>
//         el.content //content bisa di ganti name
//           .toLowerCase()
//           .includes(textSearch.toLowerCase()) ||
//         el.description // description tetep description
//           .toLowerCase()
//           .includes(textSearch.toLowerCase())
//     )
//     .map((value) => (
//       <Todo
//         key={value.id}
//         title={value.content}
//         description={value.description}
//         completed={value.completed}
//         loading={this.state.isLoading}
//         onClickDeleted={() => this.handleDelete(value.id)}
//         onClickEdited={() => this.handleEdited(value.id)}
//         onClickCompleted={() => this.handleCompleted(value.id)}
//         onClickDetails={() => this.handleDetails(value.id)}
//       />
//     ))}
