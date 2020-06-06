import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({
  auth: { error, isAuthenticated },
  setAlert,
  register,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }

    if (!error) {
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  }, [error, isAuthenticated, history]);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000);
    } else {
      register({ name, email, password });
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
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={onChange}
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
