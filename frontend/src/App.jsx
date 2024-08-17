import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage/AuthPage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <AuthPage />
    </>
  );
};

export default App;
