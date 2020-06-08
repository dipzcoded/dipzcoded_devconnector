import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utilis/setAuthToken";

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// register a user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const newUser = {
    name,
    email,
    password,
  };

  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Registeration was successful", "success"));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// login user
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const user = {
    email,
    password,
  };
  const body = JSON.stringify(user);

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout user / clear profiles
export const logOut = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOG_OUT });
};
