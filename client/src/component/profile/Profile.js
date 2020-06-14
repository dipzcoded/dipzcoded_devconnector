import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../layout/Spinner";

const Profile = ({
  profile: { profile, isLoading },
  auth,
  getProfileById,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return (
    <Fragment>
      {profile === null || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn-light btn">
            {" "}
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.isloading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                {" "}
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
