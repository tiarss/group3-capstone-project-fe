import React, { createContext, useState } from "react";
import { userContextProviderProps, userContextType } from "../types";

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
