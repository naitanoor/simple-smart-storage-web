import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

function Public({ children }) {
  const { isSignedIn } = useContext(AppContext);

  if (!isSignedIn) {
    return children;
  }
  return <Navigate to="/dashboard" replace />;
}

export default Public;
