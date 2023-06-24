import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserController } from "../api/controllers/UserController";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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
    if (email !== "") {
      const payload = {
        email,
      };
      setLoading(true);
      // Call API to send password reset email
      UserController.forgetPassword(payload)
        .then((res) => {
          setLoading(false);
          setSuccessMessage("Password reset email sent successfully");
          reset();
          navigate("/reset-password");
        })
        .catch((e) => {
          setLoading(false);
          setError(e?.message);
        });
    } else {
      setError("Please enter your email address.");
    }
  };

  const handleChange = (event) => {
    reset();
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {loading && (
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/reset-password"
            >
              Already have reset code?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
