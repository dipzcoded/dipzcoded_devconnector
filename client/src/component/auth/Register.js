import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={onChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Confirm your password"
            minLength="6"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Fragment>
  );
};

export default Register;
