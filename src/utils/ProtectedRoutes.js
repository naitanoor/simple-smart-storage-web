import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

function Protected({ children }) {
  const { isSignedIn } = useContext(AppContext);

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default Protected;
