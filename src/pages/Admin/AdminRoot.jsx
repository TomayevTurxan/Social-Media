import { useContext, useEffect } from "react";
import AdminNavbar from "../../components/Admin/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminContextItem } from "../../services/context/adminContext";

const AdminRoot = () => {
  const { admin, setAdmin } = useContext(AdminContextItem);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("admin"));

    if (storedUser && storedUser.id) {
      setAdmin(storedUser);
    } else {
      navigate("/admin/AdminLogin");
    }
  }, [navigate, setAdmin]);

  
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminRoot;
