import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/features/auth/authSlice";
import { useGetProfileQuery } from "../redux/apiSlices/authSlice";
export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = useSelector(selectAccessToken);
  const { data, isLoading } = useGetProfileQuery();
  const profileData = data?.data;

  useEffect(() => {
    if (token && profileData) {
      setUser(profileData);
    } else {
      setUser(null);
    }
  }, [token, isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};