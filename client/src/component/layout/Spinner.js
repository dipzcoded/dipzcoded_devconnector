import React, { Fragement, Fragment } from "react";
import spinner from "../../img/spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      alt="loading...."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);
