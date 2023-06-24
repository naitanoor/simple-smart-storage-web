import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./utils/ProtectedRoutes";

// public routes
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// protected routes
import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";
import DefaultNavbar from "./components/Navbar/DefaultNavbar";
import { AppContext } from "./context/AppContext";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { isSignedIn } = useContext(AppContext);

  return (
    <Router>
      {isSignedIn && <DefaultNavbar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
