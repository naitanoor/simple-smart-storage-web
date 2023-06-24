import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./utils/ProtectedRoutes";

// public routes
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// protected routes
import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";
import DefaultNavbar from "./components/Navbar/DefaultNavbar";
import { AppContext } from "./context/AppContext";

function App() {
  const { isSignedIn } = useContext(AppContext);

  return (
    <Router>
      {isSignedIn && <DefaultNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
