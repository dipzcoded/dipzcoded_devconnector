import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { avatar, name },
    status,
    company,
    location,
    website,
    social: { twitter, linkedin, instagram, facebook, youtube },
  },
}) => {
  return (
    <div>
      <div className="profile-top bg-primary p-2">
        <img src={avatar} alt="" className="round-img my-1" />
        <h1 className="large">{name}</h1>
        <p className="lead">
          {" "}
          {status} {company && <span>at {company} </span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
          {website && (
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <div className="fab fa-linkedin fa-2x"></div>
            </a>
          )}
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
