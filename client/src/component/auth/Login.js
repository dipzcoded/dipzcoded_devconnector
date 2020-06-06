import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ auth: { isAuthenticated }, loginUser, history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password);
    setFormData({
      email: "",
      password: "",
    });
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
