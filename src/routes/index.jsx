import AdminLogin from "../components/Admin/Login";
import Login from "../components/Login";
import Register from "../components/Register";
import AdminHome from "../pages/Admin/AdminHome/INDEX.JSX";
import AdminRoot from "../pages/Admin/AdminRoot";
import Feed from "../pages/User/Feed";
import Home from "../pages/User/Home";
import SearchUser from "../pages/User/SearchUser";
import UserPage from "../pages/User/UserPage";
import UserRoot from "../pages/User/UserRoot";

export const ROUTES = [
  {
    path: "/",
    element: <UserRoot/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/user",
    element: <UserRoot />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "UserPage",
        element: <UserPage />,
      },
      {
        path: "SearchUser",
        element: <SearchUser/>,
      },
      {
        path: "Feed",
        element: <Feed/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot/>,
    children: [
      {
        path: "AdminLogin",
        element: <AdminLogin/>
      },
      {
        path: "AdminHome",
        element: <AdminHome/>
      },
    ]
  }
];
