import {Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
   const isAuth = localStorage.getItem("isAuth")

  if (isAuth) {
    return children;
  }

  return <Navigate to='/login' />
};
export default PrivateRoute;
