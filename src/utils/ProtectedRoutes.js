import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { AUTH_TOKEN } from "../constants";
import { getValue } from "../api/CommonFunctions";

function ProtectedRoutes({ children }) {
  return !getValue(AUTH_TOKEN) ? <Navigate to={"/sign-in"} /> : children;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
