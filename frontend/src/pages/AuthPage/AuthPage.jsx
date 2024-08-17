import React, { useState } from "react";
import styles from "./AuthPage.module.css";
import useValidateRegister from "../../hooks/useValidateRegister";
import useValidateLogin from "../../hooks/useValidateLogin";
import { toast } from "react-toastify";

const AuthPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isLogin, setIsLogin] = useState(false);
  const [credentials, setCredentials] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
          console.log("login");
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
          console.log("register");
        } finally {
          setIsLoading(false);
          setCredentials(initialValues);
        }
      } else {
        toast.error("Please ensure valid info is given");
      }
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
