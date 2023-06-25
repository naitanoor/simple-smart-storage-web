import React from "react";

function Dashboard() {
  return (
    <div className="flex justify-center bg-gray-100">
      <div
        style={{ width: "100%" }}
        className="flex items-center h-20 w-screen"
      >
        <div className="ml-0 items-center w-screen">
          <h2 className="text-2xl font-bold" style={{ color: "#2C847B" }}>
            Welcome, Ali
          </h2>
          <h2 className="text-1xl">
            Here you can create your package or find your box.
          </h2>
        </div>
        <p className="text-gray-600 ml-auto mr-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
