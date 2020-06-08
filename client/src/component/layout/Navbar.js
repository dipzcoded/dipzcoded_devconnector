import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, isLoading }, logOut }) => {
  const onClick = (e) => {
    logOut();
  };

  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          {" "}
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>

      <li>
        <a onClick={onClick} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          {" "}
          <i className="fas fa-code" /> Devconnector{" "}
        </Link>
      </h1>
      {isAuthenticated && !isLoading ? authLinks : guestLinks}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
