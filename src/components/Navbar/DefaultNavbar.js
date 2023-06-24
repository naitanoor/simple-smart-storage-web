import React from "react";
import { Link } from "react-router-dom";

export default function DefaultNavbar() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-2 m-0">
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
      </nav>
    </div>
  );
}
