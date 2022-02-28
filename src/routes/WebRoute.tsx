import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../helper/UserContext";
import { Beranda } from "../pages/Beranda";
import DirektoriAset from "../pages/DirektoriAset";
import { Profile } from "../pages/Profile";
import SignIn from "../pages/SignIn";
import { TestComponent } from "../pages/TestComponent";

export const WebRoute = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/test" element={<TestComponent />} />
          <Route path='/sign-in' element={<SignIn />} />
          {/* Employee */}
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/direktori-aset" element={<DirektoriAset />} />
          {/* <Route path='/sign-up' element={<SignUp />} /> */}
          {/* <Route path='/profile' element={<Profile />} /> */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
