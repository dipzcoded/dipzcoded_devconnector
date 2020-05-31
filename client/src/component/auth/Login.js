import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData({
      email: "",
      password: "",
    });
    console.log("success");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            minLength="6"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input className="btn btn-dark" type="submit" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
