import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { userContext } from "../helper/UserContext";
import { userData } from "../types";
import moment from "moment";
import { Input } from "@chakra-ui/react";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDataProfile, setUserDataProfile] = useState<userData>();
  const { userData, setUserData } = useContext(userContext);

  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<File>();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files;
    if (!value) return;

    setUserAvatar(value[0]);
    //  console.log(value)
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPhone(value);
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = () => {
    axios
      .get("https://klender.xyz/users/2", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setUserDataProfile(data);
        setUserData({
          name: data.name,
          avatar: data.avatar,
          id: data.id,
        });
        localStorage.setItem("avatar", data.avatar);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEdit = () => {
    setUserName(userDataProfile!.name);
    setUserPhone(userDataProfile!.phone);
    setUserEmail(userDataProfile!.email);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", userEmail);
    formData.append("phone", userPhone);
    if (userAvatar) {
      formData.append("avatar", userAvatar);
    }
    axios
      .put("https://klender.xyz/users/2", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        fetchUserById();
      });
  };

  const handleExpire = () => {
    const expire = localStorage.getItem("expired");
    if (expire) {
      const parse: number = parseInt(expire);
      const date = moment.unix(parse).format();
      console.log(date);
    }
  };

  return (
    <>
      <Header />
      <div>
        <p>Nama</p>
        <input type='text' onChange={handleName} value={userName} />
        <p>Email</p>
        <input type='text' onChange={handleEmail} value={userEmail} />
        <p>Phone</p>
        <input type='text' onChange={handlePhone} value={userPhone} />
        <p>Avatar</p>
        <input type='file' onChange={handleAvatar} />
      </div>
      <Button colorScheme="blue">
        <label
          htmlFor='file1'
          style={{color: "red" }}>Pilih aku</label>
      </Button>
        <Input display='none' type='file' id='file1' />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleSubmit}>Submit Edit</button>
      <Button onClick={handleExpire}>Test convert expire</Button>
      {isLoading ? (
        <>
          <p>Nama</p>
          <p>Email</p>
          <p>Phone</p>
          <img src='' alt='' />
        </>
      ) : (
        <>
          <p>{userDataProfile?.name}</p>
          <p>{userDataProfile?.email}</p>
          <p>{userDataProfile?.phone}</p>
          <img
            style={{ width: "100px" }}
            src={userDataProfile?.avatar}
            alt={`avatar ${userDataProfile?.id}`}
          />
        </>
      )}
    </>
  );
};
