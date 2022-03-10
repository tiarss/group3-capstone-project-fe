import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isAuth = localStorage.getItem("isAuth")
  console.log(isAuth)
  if (isAuth) {
    return children;
  }

  return <Navigate to='/sign-in' />
};
export default ProtectedRoute;
