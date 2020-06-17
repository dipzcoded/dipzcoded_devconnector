import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import ProfileGitHub from "./ProfileGitHub";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

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
            {/* Experience */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>

              {profile.experience.length > 0 ? (
                <ProfileExp experience={profile.experience} />
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            {/* Education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>

              {profile.education.length > 0 ? (
                <ProfileEdu education={profile.education} />
              ) : (
                <h4>No education credentails</h4>
              )}
            </div>

            {/* Github Repos */}
            {profile.githubusername && (
              <ProfileGitHub username={profile.githubusername} />
            )}
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
