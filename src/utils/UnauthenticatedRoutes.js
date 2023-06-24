import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { getValue } from "../api/CommonFunctions";
import { AUTH_TOKEN } from "../constants";

function UnauthenticatedRoutes({ children }) {
  return !getValue(AUTH_TOKEN) ? children : <Navigate to={"/dashboard"} />;
}

// function Protected({ isSignedIn, children }) {
//   if (!isSignedIn) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

export default UnauthenticatedRoutes;
