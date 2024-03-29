import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

const AddExperience = ({ addExperience, history}) => {


  const [experience, setExperience] = useState({
    title : '',
    company : '',
    location : '',
    from : '',
    current : false,
    to : '',
    description : ''
  })

  const [ toDateDisabled, toggleDisabled] = useState(false);

  const {
    title,
    company,
    location,
    from,
    current,
    to,
    description
  } = experience;
 

  const onChange = e => {
    setExperience({...experience, [e.target.name] : e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault();
    addExperience(experience, history);
  }

  return (
    <Fragment>

      <h1 className="large text-primary">
        Add an Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name = "title" onChange={onChange} value={title}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Company" name = "company" onChange={onChange} value={company}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name = "location" onChange={onChange} value={location} />
        </div>

        <div className="form-group">
         <h4>From Date</h4>
         <input type="date" name="from" onChange={onChange} value={from} />
        </div>

        <div className="form-group">
          <p><input type="checkbox" name="current" onChange={(e) => 
          {
          setExperience({...experience, current : !current});
          toggleDisabled(!toDateDisabled);
            }} checked={ current}/>{' '} Current Job</p>
        </div>

        <div className="form-group">
         <h4>To Date</h4>
         <input type="date" name="to" onChange={onChange} value={to} disabled={toDateDisabled ? 'disabled' : ''} />
        </div>


        <div className="form-group">
          <textarea name="description"  cols="30" rows="5" placeholder="Job Description" onChange={onChange} value={description} ></textarea> 
        </div>

      <input type="submit" value="Submit" className="btn btn-primary my-1"/>
      <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {

  addExperience : PropTypes.func.isRequired

}

export default connect(null, { addExperience })( withRouter(AddExperience))
