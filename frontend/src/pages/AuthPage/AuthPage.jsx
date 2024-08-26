import React, { useState } from "react";
import styles from "./AuthPage.module.css";
import useValidateRegister from "../../hooks/useValidateRegister";
import useValidateLogin from "../../hooks/useValidateLogin";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { registerUser, loginUser } from "../../api/auth";

const AuthPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [credentials, setCredentials] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { isLogin, setIsLogin, loginContext, setToken } = useAuth();

  const navigateSignUpPage = () => {
    setCredentials(initialValues);
    setFormErrors({});
    setIsLogin(false);
  };
  const navigateLoginPage = () => {
    setCredentials(initialValues);
    setFormErrors({});
    setIsLogin(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const errors = useValidateLogin(credentials);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        try {
          login();
        } finally {
          setIsLoading(false);
          setCredentials(initialValues);
        }
      } else {
        toast.error("Please ensure valid info is given");
      }
    } else {
      const errors = useValidateRegister(credentials);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        try {
          register();
        } finally {
          setIsLoading(false);
          setCredentials(initialValues);
        }
      } else {
        toast.error("Please ensure valid info is given");
      }
    }
  };

  const register = async () => {
    try {
      const response = await registerUser(
        credentials.name,
        credentials.email,
        credentials.password
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setCredentials(initialValues);
        setIsLogin(true);
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during Sign Up. Please try again later.");
    }
  };

  const login = async () => {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        loginContext(response?.data?.token);
        setCredentials(initialValues);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };
  return (
    <div className={styles.authWrapper}>
      <div className={styles.credArea}>
        <div className={styles.title}>
          <h1>QUIZZIE</h1>
          <div className={styles.authNav}>
            <p
              onClick={navigateSignUpPage}
              className={`${!isLogin ? styles.selectedNav : ""}`}
            >
              Sign Up
            </p>
            <p
              onClick={navigateLoginPage}
              className={`${isLogin ? styles.selectedNav : ""}`}
            >
              Log In
            </p>
          </div>
        </div>
        <form className={styles.fields} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formErrors.name ? "" : credentials.name}
                onChange={(e) => {
                  setFormErrors({ ...formErrors, name: "" });
                  handleChange(e);
                }}
                placeholder={formErrors.name || "Enter name"}
                className={`${
                  formErrors.name ? styles.errorBorder : styles.inputs
                }`}
              />
            </div>
          )}
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formErrors.email ? "" : credentials.email}
              onChange={(e) => {
                setFormErrors({ ...formErrors, email: "" });
                handleChange(e);
              }}
              placeholder={formErrors.email || "Enter email"}
              className={`${
                formErrors.email ? styles.errorBorder : styles.inputs
              }`}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formErrors.password ? "" : credentials.password}
              onChange={(e) => {
                setFormErrors({ ...formErrors, password: "" });
                handleChange(e);
              }}
              placeholder={formErrors.password || "**********"}
              className={`${
                formErrors.password ? styles.errorBorder : styles.inputs
              }`}
            />
          </div>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={
                  formErrors.confirmPassword ? "" : credentials.confirmPassword
                }
                onChange={(e) => {
                  setFormErrors({ ...formErrors, confirmPassword: "" });
                  handleChange(e);
                }}
                placeholder={formErrors.confirmPassword || "**********"}
                className={`${
                  formErrors.confirmPassword
                    ? styles.errorBorder
                    : styles.inputs
                }`}
              />
            </div>
          )}
          <div className={styles.submitBtn}>
            <button type="submit">
              {isLoading
                ? isLogin
                  ? "Logging In..."
                  : "Signing Up..."
                : isLogin
                ? "Log In"
                : "Sign-Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
