import axios from "axios";
import React, { useEffect, useState } from "react";
import { userData } from "../types";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<userData>();

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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NDQ4NTkzNTcsImlkIjoyfQ.czrUGUPFe34DRoGotba2fjSVDlb_xg3cUkbp_rCivLQ",
        },
      })
      .then((res) => {
        const { data } = res.data;
        setUserData(data);
        console.log(data);
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
    setUserName(userData!.name);
    setUserPhone(userData!.phone);
    setUserEmail(userData!.email);
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
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NDQ4NTkzNTcsImlkIjoyfQ.czrUGUPFe34DRoGotba2fjSVDlb_xg3cUkbp_rCivLQ",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
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
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleSubmit}>Submit Edit</button>
      {isLoading ? (
        <>
          <p>Nama</p>
          <p>Email</p>
          <p>Phone</p>
          <img src='' alt='' />
        </>
      ) : (
        <>
          <p>{userData?.name}</p>
          <p>{userData?.email}</p>
          <p>{userData?.phone}</p>
          <img
            style={{ width: "100px" }}
            src={userData?.avatar}
            alt={`avatar ${userData?.id}`}
          />
        </>
      )}
    </>
  );
};
