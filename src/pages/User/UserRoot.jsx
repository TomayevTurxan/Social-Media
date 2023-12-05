import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNavbar from "../../components/User/Navbar";
import { UserContextItem } from "../../services/context/UserContext";

const UserRoot = () => {
  const { user, setUser } = useContext(UserContextItem);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/Login");
    }
  }, [navigate, setUser]);

  if (!user) {
    return null; 
  }

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserRoot;
