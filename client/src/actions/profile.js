import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE , ACCOUNT_DELETED} from "./types";

// get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await axios.post("/api/profile", body, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(
        edit ? "Profile Updated" : "Profile Created",
        edit ? "primary" : "success"
      )
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((er) => {
        dispatch(setAlert(er.msg, "danger"));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {

        const config = {
          headers : {
            "Content-type" : "application/json"
          }
        };

        const body = JSON.stringify(formData);

        const res = await axios.put('/api/profile/experience', body, config);
        dispatch({type : UPDATE_PROFILE, payload : res.data});

        // setting alert when updated
        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
      
    } catch (error) {

        const errors = error.response.data.errors;
        if(errors)
        {
          errors.forEach(err => {dispatch(setAlert(err.msg,'danger'))})
        }

        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}});
      
    }


}

// Add Education

export const addEducation = (formData, history) => async dispatch => {

  try {

    const config = {
      headers : {
        "Content-type" : "application/json"
      }
    };

    const body = JSON.stringify(formData);

    const res = await axios.put('/api/profile/education', body, config);

    dispatch({type : UPDATE_PROFILE, payload : res.data});
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
    
  } catch (error) {
    
    const errors = error.response.data.errors;
    if(errors)
    {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

      dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}});

  }

}

// Delete Experience
export const deleteExperience = id => async dispatch => {

  try {

   const res = await axios.delete(`/api/profile/experience/${id}`);
  dispatch({type : UPDATE_PROFILE, payload : res.data});
  dispatch(setAlert('Experience Removed', 'success'));
    
  } catch (error) {

    dispatch({type : PROFILE_ERROR, payload:{msg : error.response.statusText, status : error.response.status}});
    
  }

}

// delete education
export const deleteEducation = id => async dispatch => {

  try {

    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({type : UPDATE_PROFILE, payload : res.data});
    dispatch(setAlert('Education Removed', 'success'));
    
  } catch (error) {
      dispatch({type : PROFILE_ERROR , payload : {msg : error.response.statusText, status : error.response.status}});
  }

}


// delete account
export const deleteAccount = () => async dispatch => {

  if(window.confirm('Are you sure? This cant be undone!'))
  {
      
  try {

    await axios.delete('/api/profile');
    dispatch({type :CLEAR_PROFILE});
    dispatch({type : ACCOUNT_DELETED})
    dispatch(setAlert('Your account has been permanantly deleted'));
    
  } catch (error) {
      dispatch({type : PROFILE_ERROR, payload: {msg : error.response.statusText, status : error.response.status}})
  }
  }
} 
