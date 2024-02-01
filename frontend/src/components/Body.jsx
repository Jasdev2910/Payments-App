import React from "react";
import { Appbar } from "./Appbar";
import Dashboard from "./Dashboard";
import { Component } from "./Sidebar";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const Body = () => {
  const user = useUser();
  if (user.loading) {
    return "Loading....";
  }

  if (!user.userDetails) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <Appbar />
      <div className="flex w-screen">
        <Component />
        <Dashboard />
      </div>
    </div>
  );
};

export default Body;
