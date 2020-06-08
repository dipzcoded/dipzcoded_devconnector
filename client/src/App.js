import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Alert from "./component/layout/Alert";
import { loadUser } from "./actions/auth";
import Dashboard from "./component/dashboard/Dashboard";
import setAuthToken from "./utilis/setAuthToken";
import CreateProfile from "./component/profile-form/CreateProfile";
import EditProfile from "./component/profile-form/EditProfile";
import PrivateRoute from "./component/routing/PrivateRoute";

// setting the x-auth-token headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
