import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../helper/UserContext";
import { Beranda } from "../pages/Beranda";
import DirektoriAset from "../pages/DirektoriAset";
import { Profile } from "../pages/Profile";
import { PenggunaAset } from "../pages/PenggunaAset";
import SignIn from "../pages/SignIn";
import { TestComponent } from "../pages/TestComponent";
import { NotFound } from "../pages/NotFound";
import { MaintenanceContext } from "../helper/MaintenanceContext";

export const WebRoute = () => {
  console.log("aku duluan");
  const role = localStorage.getItem("role");
  const [Maintained, setMaintained] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <UserProvider>
      <MaintenanceContext.Provider value={{Maintained, setMaintained}}>
        <Routes>
          <Route path='/test' element={<TestComponent />} />
          <Route path='/sign-in' element={<SignIn />} />
          {/* Employee */}
          {role === "Employee" ? (
            <>
              <Route path='/beranda' element={<Beranda />} />
              <Route path='*' element={<NotFound />} />
              <Route path="/direktori-aset" element={<DirektoriAset />} />
            </>
          ) : role === "Administrator" ? (
            <>
              <Route path='/pengguna-aset' element={<PenggunaAset />} />
              <Route path='/beranda' element={<Beranda />} />
            <Route path='/direktori-aset' element={<DirektoriAset />} />
              <Route path='*' element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path='/beranda' element={<Beranda />} />
              <Route path='/pengguna-aset' element={<PenggunaAset />} />
              <Route path='*' element={<NotFound />} />
            </>
          )}
          {/* <Route path='/sign-up' element={<SignUp />} /> */}
          {/* <Route path='/profile' element={<Profile />} /> */}
        </Routes>
      </MaintenanceContext.Provider>
      </UserProvider>
    </BrowserRouter>
  );
};
