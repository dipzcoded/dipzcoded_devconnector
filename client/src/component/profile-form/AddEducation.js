import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

const AddEducation = ({ addEducation, history}) => {


  const [education, setEducation] = useState({
    school : '',
    degree : '',
    fieldofstudy : '',
    from : '',
    to : '',
    description : ''
  })


  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description
  } = education;

  const onChange = e => {
    setEducation({...education, [e.target.name] : e.target.value});
  }
 

  const onSubmit = e => {
    e.preventDefault();
    addEducation(education, history);
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attented
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name = "school" onChange={onChange} value={school}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name = "degree" onChange={onChange} value={degree}/>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Field of Study" name = "fieldofstudy" onChange={onChange} value={fieldofstudy} />
        </div>

        <div className="form-group">
         <h4>From Date</h4>
         <input type="date" name="from" onChange={onChange} value={from} />
        </div>

        <div className="form-group">
         <h4>To Date</h4>
         <input type="date" name="to" onChange={onChange} value={to} />
        </div>


        <div className="form-group">
          <textarea name="description"  cols="30" rows="5" placeholder="Program Description" onChange={onChange} value={description} ></textarea> 
        </div>

      <input type="submit" value="Submit" className="btn btn-primary my-1"/>
      <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {

  addEducation : PropTypes.func.isRequired

}

export default connect(null, { addEducation})( withRouter(AddEducation))
