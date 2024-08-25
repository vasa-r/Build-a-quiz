import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LiveQuiz from "./pages/LiveQuiz/LiveQuiz";

const App = () => {
  return (
    <>
      <ToastContainer />
      {/* <AuthPage /> */}
      {/* <DashboardPage /> */}
      <LiveQuiz />
    </>
  );
};

export default App;
