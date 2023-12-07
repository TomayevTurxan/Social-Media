import Login from "../components/Login";
import Register from "../components/Register";
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
    ],
  },
];
