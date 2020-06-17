import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGitHub = ({ profile: { repos }, username, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return repos === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="profile-github bg-white p-2">
        <h2 className="text-primary">GitHub Repos</h2>
        {repos.length === 0 ? (
          <h4>No repos for the user</h4>
        ) : (
          repos.map((rep) => (
            <div key={rep._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repos.html.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {rep.name}
                  </a>
                </h4>
                <p>{rep.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars : {rep.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers : {rep.watchers_count}
                  </li>
                  <li className="badge badge-primary">
                    Forks : {rep.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
};

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProp, { getGithubRepos })(ProfileGitHub);
