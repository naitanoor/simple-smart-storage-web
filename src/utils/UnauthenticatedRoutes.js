import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { getValue } from "../api/CommonFunctions";
import { AUTH_TOKEN } from "../constants";

function UnauthenticatedRoutes({ children }) {
  console.log("getValue(AUTH_TOKEN)", getValue(AUTH_TOKEN));
  return getValue(AUTH_TOKEN) ? children : <Navigate to={"/dashboard"} />;
}

UnauthenticatedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnauthenticatedRoutes;
