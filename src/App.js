import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./utils/ProtectedRoutes";
import Public from "./utils/UnauthenticatedRoutes";
import LayoutMaster from "./components/LayoutMaster";

// public routes
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

// not found page
import NotFound from "./pages/NotFound";
// protected routes

import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AddWarehouse from "./pages/AddWarehouse";
import AddStoreroom from "./pages/AddStoreroom";
import AddRack from "./pages/AddRack";
import TraceBox from "./pages/TraceBox";
import BoxDetails from "./pages/BoxDetails";
import CreatePackage from "./pages/CreatePackage";
import AddPackageDetals from "./pages/AddPackageDetails";
import AddPackageItem from "./pages/AddPackageItem";

function App() {
  return (
    <Router>
      <LayoutMaster>
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <SignIn />
              </Public>
            }
          />
          <Route
            path="/signin"
            element={
              <Public>
                <SignIn />
              </Public>
            }
          />
          <Route
            path="/signup"
            element={
              <Public>
                <SignUp />
              </Public>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Public>
                <ForgotPassword />
              </Public>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Public>
                <ResetPassword />
              </Public>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/add-warehouse"
            element={
              <Protected>
                <AddWarehouse />
              </Protected>
            }
          />
          <Route
            path="/add-storeroom"
            element={
              <Protected>
                <AddStoreroom />
              </Protected>
            }
          />
          <Route
            path="/add-rack"
            element={
              <Protected>
                <AddRack />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/search-box"
            element={
              <Protected>
                <TraceBox />
              </Protected>
            }
          />
          <Route
            path="/box-details"
            element={
              <Protected>
                <BoxDetails />
              </Protected>
            }
          />
          <Route
            path="/create-box"
            element={
              <Protected>
                <CreatePackage />
              </Protected>
            }
          />
          <Route
            path="/add-package-details"
            element={
              <Protected>
                <AddPackageDetals />
              </Protected>
            }
          />
          <Route
            path="/add-package-item"
            element={
              <Protected>
                <AddPackageItem />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutMaster>
    </Router>
  );
}

export default App;
