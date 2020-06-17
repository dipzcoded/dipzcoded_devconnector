import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Momemt from "react-moment";
import Moment from "react-moment";

const ProfileExp = ({ experience }) => {
  return (
    <Fragment>
      {experience.map((exp) => (
        <div key={exp._id}>
          {exp.company && <h3 className="text-dark">{exp.company}</h3>}
          <p>
            <Moment format="MM/YYYY">{exp.from}</Moment> -{" "}
            {exp.current ? (
              "current"
            ) : (
              <Moment format="MM/YYYY">{exp.to}</Moment>
            )}{" "}
          </p>
          <p>
            <strong>Position</strong> : {exp.title}
          </p>
          <p>
            <strong>Description:</strong>
            {exp.description && <span>{exp.description}</span>}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

ProfileExp.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExp;
