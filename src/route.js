import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Upload from "./components/Upload/Upload";
import { UserContext } from "./context/MainContext";
const MainRoute = () => {
  const { currentUserLoggedIn } = useContext(UserContext);
  const RequiredLogin = ({ children }) => {
    return currentUserLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequiredLogin>
                <App />
              </RequiredLogin>
            }
          />
          <Route
            exact
            path="/upload"
            element={
              <RequiredLogin>
                <Upload />
                //{" "}
              </RequiredLogin>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoute;
