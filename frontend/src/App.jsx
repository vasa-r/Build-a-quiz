import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import LiveQuiz from "./pages/LiveQuiz/LiveQuiz";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LazyLoader from "./components/LoadinComponents/LazyLoader/LazyLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
const DashboardPage = React.lazy(() =>
  import("./pages/DashboardPage/DashboardPage")
);

const App = () => {
  const { token } = useAuth();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to={"/main/dashboard"} /> : <AuthPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/main/*"
            element={
              <Suspense fallback={<LazyLoader />}>
                <DashboardPage />
              </Suspense>
            }
          />
        </Route>
        <Route path="live/*" element={<LiveQuiz />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
