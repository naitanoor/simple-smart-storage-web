import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5"; // Import the logout icon from a different library

import { removeData } from "../../api/CommonFunctions";
import { AppContext } from "../../context/AppContext";

export default function DefaultNavbar() {
  const { setIsSignedIn, setUserData } = useContext(AppContext);

  const handleLogout = async () => {
    await removeData("userData");
    setUserData(null);
    setIsSignedIn(false);
  };

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-2 m-0">
      <nav
        style={{
          margin: 10,
        }}
      >
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <button
          style={{ marginLeft: "auto", alignSelf: "flex-end" }}
          onClick={handleLogout}
        >
          <IoLogOutOutline size={20} />
        </button>
      </nav>
    </div>
  );
}
