import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import UnauthenticatedRoutes from "./utils/UnauthenticatedRoutes";

// public routes
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// protected routes
import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";
import DefaultNavbar from "./components/Navbar/DefaultNavbar";
import { AppContext } from "./context/AppContext";
import { getData } from "./api/CommonFunctions";

function App() {
  const { isSignedIn, setIsSignedIn, setUserData } = useContext(AppContext);

  const [signInStatusChecked, setSignInStatusChecked] = useState(false);

  // References

  useEffect(() => {
    (async () => {
      const userData = await getData("userData");
      console.log("🚀 ~ file: App.js:30 ~ userData:", userData);
      if (userData) {
        setUserData(userData);
        setIsSignedIn(true);
      }
      setSignInStatusChecked(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {isSignedIn && <DefaultNavbar />}
      <Routes>
        <Route
          path="/"
          element={
            <UnauthenticatedRoutes>
              <Home />
            </UnauthenticatedRoutes>
          }
        />
        <Route
          path="/signin"
          element={
            <UnauthenticatedRoutes>
              <SignIn />
            </UnauthenticatedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoutes>
              <SignUp />
            </UnauthenticatedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
