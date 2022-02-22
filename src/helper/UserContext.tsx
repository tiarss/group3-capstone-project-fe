import React, { createContext, useState } from "react";

type userType = {
  id: number;
  name: string;
  avatar: string;
};

type userContextType = {
  userData: userType;
  setUserData: React.Dispatch<React.SetStateAction<userType>>;
};

type userContextProviderProps = {
  children: React.ReactNode;
};

const setDefaultValue = {
  id: 0,
  name: "Guest",
  avatar: "",
};

export const userContext = createContext({} as userContextType);

export const UserProvider = ({ children }: userContextProviderProps) => {
  const [userData, setUserData] = useState(setDefaultValue);
  return (
    <userContext.Provider
      value={{
        userData,
        setUserData,
      }}>
      {children}
    </userContext.Provider>
  );
};
