/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import UserContextProvider from "./services/context/UsersContext";
import UserContextProviderItem from "./services/context/UserContext";
import "./App.css" 
const routes = createBrowserRouter(ROUTES);

const App = () => {
  return (
    <>
      <UserContextProviderItem>
        <UserContextProvider>
          <RouterProvider router={routes} />
        </UserContextProvider>
      </UserContextProviderItem>
    </>
  );
};

export default App;
