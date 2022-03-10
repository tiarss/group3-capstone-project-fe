import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext, UserProvider } from "../helper/UserContext";
import { Beranda } from "../pages/Beranda";
import DirektoriAset from "../pages/DirektoriAset";
import { PenggunaAset } from "../pages/PenggunaAset";
import SignIn from "../pages/SignIn";
import { NotFound } from "../pages/NotFound";
import { MaintenanceContext } from "../helper/MaintenanceContext";
import {TriggerProvider } from "../helper/Trigger";
import PengadaanAset from "../pages/PengadaanAset";
import { Redirect } from "../pages/Redirect";
import ProtectedRoute from "../helper/ProtectedRoute";

export const WebRoute = () => {
  const [Maintained, setMaintained] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <TriggerProvider>
        <MaintenanceContext.Provider value={{ Maintained, setMaintained }}>
          <UserProvider>
            <Routes>
              <Route path='/' element={<Redirect />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route
                path='/beranda'
                element={
                  <ProtectedRoute>
                    <Beranda />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/direktori-aset'
                element={
                  <ProtectedRoute>
                    <DirektoriAset />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/pengguna-aset'
                element={
                  <ProtectedRoute>
                    <PenggunaAset />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/pengadaan-aset'
                element={
                  <ProtectedRoute>
                    <PengadaanAset />
                  </ProtectedRoute>
                }
              />

              <Route
                path='/permohonan'
                element={
                  <ProtectedRoute>
                    <PenggunaAset />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </UserProvider>
        </MaintenanceContext.Provider>
      </TriggerProvider>
    </BrowserRouter>
  );
};
