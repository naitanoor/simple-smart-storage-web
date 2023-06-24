import React, { useState } from "react";
import { Link } from "react-router-dom";

import { UserController } from "../api/controllers/UserController";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = (e) => {
    reset();
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      const payload = {
        name,
        email,
        password,
      };
      setLoading(true);
      setTimeout(() => {
        // call to API
        UserController.signUp(payload)
          .then((res) => {
            setLoading(false);
            setSuccessMessage("Account created successfully");
          })
          .catch((e) => {
            setLoading(false);
            setError(e);
          });
      }, 2000);
    } else {
      setError("Please fill all fields.");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform dummy API call here using formData
  //   fetch("https://api.example.com/signup", {
  //     method: "POST",
  //     body: JSON.stringify("formData"),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("API response:", data);
  //       // Handle the API response here
  //     })
  //     .catch((error) => {
  //       console.error("API error:", error);
  //       // Handle the API error here
  //     });
  // };

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
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

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
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange(setName)}
              required
            />
          </div>
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
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

export default SignupScreen;
