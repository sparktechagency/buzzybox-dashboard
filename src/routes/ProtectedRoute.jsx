import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../redux/apiSlices/authSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data, isLoading, isError, isFetching } = useGetProfileQuery();
  const profile = data?.data;

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (
    profile?.role &&
    (profile?.role === "ADMIN" || profile?.role === "SUPER_ADMIN")
  ) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
