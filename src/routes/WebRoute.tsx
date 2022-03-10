import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../helper/UserContext";
import { Beranda } from "../pages/Beranda";
import DirektoriAset from "../pages/DirektoriAset";
import { PenggunaAset } from "../pages/PenggunaAset";
import SignIn from "../pages/SignIn";
import { NotFound } from "../pages/NotFound";
import { MaintenanceContext } from "../helper/MaintenanceContext";
import { TriggerProvider } from "../helper/Trigger";
import PengadaanAset from "../pages/PengadaanAset";
import { Redirect } from "../pages/Redirect";
import ProtectedRoute from "../helper/ProtectedRoute";

export const WebRoute = () => {
  //const role = localStorage.getItem("role");
  const [Maintained, setMaintained] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>("Employee");

  const handleRole = () => {
    const role = localStorage.getItem('role');
    setRole(role);
  }

  useEffect(()=> {
    handleRole();
  }, [])
  
  return (
    <BrowserRouter>
      <TriggerProvider>
        <MaintenanceContext.Provider value={{ Maintained, setMaintained }}>
          {console.log(role)}
          <UserProvider>
            <Routes>
              <Route path='/' element={<Redirect />} />
              <Route path='/sign-in' element={<SignIn />} />
              {role === "Employee" ? (
                <>
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
                  {/* <Route path='*' element={<NotFound />} /> */}
                </>
              ) : role === "Administrator" ? (
                <>
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
                  {/* <Route path='*' element={<NotFound />} /> */}
                </>
              ) : (
                <>
                  <Route
                    path='/beranda'
                    element={
                      <ProtectedRoute>
                        <Beranda />
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
                  {/* <Route path='*' element={<NotFound />} /> */}
                </>
              )}
            </Routes>
          </UserProvider>
        </MaintenanceContext.Provider>
      </TriggerProvider>
    </BrowserRouter>
  );
};
