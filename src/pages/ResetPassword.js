import React, { useState } from "react";
import { Link } from "react-router-dom";

import { UserController } from "../api/controllers/UserController";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = (e) => {
    reset();
    e.preventDefault();
    if (email !== "" && resetCode !== "" && newPassword !== "") {
      const payload = {
        email,
        resetCode,
        newPassword,
      };
      setLoading(true);
      // Call API to reset password
      UserController.resetPassword(payload)
        .then((res) => {
          setLoading(false);
          setSuccessMessage(res.message);
        })
        .catch((e) => {
          setLoading(false);
          setError(e?.message);
        });
    } else {
      setError("Please fill all fields.");
    }
  };

  const handleChange = (setState) => {
    return (event) => {
      reset();
      const { value } = event.target;
      setState(value);
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        {loading && (
          <div className="flex items-center justify-center mb-4">
            <div
              style={{ borderColor: "#2C847B" }}
              className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
            ></div>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange(setEmail)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resetCode"
            >
              Reset Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resetCode"
              type="text"
              placeholder="Enter reset code"
              value={resetCode}
              onChange={handleChange(setResetCode)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleChange(setNewPassword)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              style={{ backgroundColor: "#2C847B" }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Reset Password
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signin"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
