import { useState } from "react";
// import PropTypes from "prop-types";
import Router from "next/router";
import { loginUser } from "../lib/auth";

const initLoginData = {
  email: "Lucio_Hettinger@annie.ca",
  password: "demarco.info",
  isLoading: false,
  error: "",
};

const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState(initLoginData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginFormData({
      ...loginFormData,
      error: "",
      isLoading: true,
    });

    loginUser({
      email: loginFormData.email,
      password: loginFormData.password,
    })
      .then(() => {
        Router.push("/profile");
        setLoginFormData(initLoginData);
      })
      .catch(setError);
  };

  const setError = (err) => {
    console.error(err);
    const error = (err.response && err.response.data) || err.message;
    setLoginFormData({
      ...loginFormData,
      error,
      isLoading: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={loginFormData.email || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginFormData.password || ""}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={loginFormData.isLoading}>
        {loginFormData.isLoading ? "Sending" : "Submit"}
      </button>
      {loginFormData.error && <div>{loginFormData.error}</div>}
    </form>
  );
};

/* LoginForm.propTypes = {} */

export default LoginForm;
