import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isFetching } = useGetProfileQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true, // Disable caching by refetching on mount
    }
  );
  const profile = data?.data;

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (
    profile?.role &&
    (profile?.role === "ADMIN" || profile?.role === "SUPER_ADMIN")
  ) {
    return children;
  }

  toast.error("You are not authorized");
  dispatch(logOut());
  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
