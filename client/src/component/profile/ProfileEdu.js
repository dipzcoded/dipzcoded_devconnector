import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEdu = ({ education }) => {
  return (
    <Fragment>
      {education.map((edu) => (
        <div key={edu._id}>
          {edu.school && <h3 className="text-dark">{edu.school}</h3>}
          <p>
            <Moment format="MM/YYYY">{edu.from}</Moment> -{" "}
            {edu.to ? <Moment format="MM/YYYY">{edu.to}</Moment> : "NaN"}
          </p>
          <p>
            <strong>Degree:</strong> {edu.degree}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {edu.description && <span>{edu.description}</span>}
          </p>
        </div>
      ))}
    </Fragment>
  );
};

ProfileEdu.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEdu;
