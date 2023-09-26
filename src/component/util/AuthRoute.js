import React from "react";

//redux
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "../Pages/Login";

const AuthRoute = () => {
  ;
  // const isAuth = false;
  const isAuth = sessionStorage.getItem("isAuth");

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
