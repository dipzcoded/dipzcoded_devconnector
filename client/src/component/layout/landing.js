import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const landing = ({ auth: { isAuthenticated, isLoading } }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            {!isAuthenticated && !isLoading && (
              <Fragment>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(landing);
