import React from "react";
import { Appbar } from "./Appbar";
import Dashboard from "./Dashboard";
import { Component } from "./Sidebar";
import useUser from "../hooks/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Update from "./Update";

const Body = () => {
  const user = useUser();
  // if (user.loading) {
  //   return "Loading....";
  // }

  // if (!user.userDetails) {
  //   return <Navigate to="/signin" />;
  // }

  return (
    <div>
      <Appbar name={user?.userDetails?.user?.firstName} />
      <div className="flex">
        <Component />
        <Outlet context={user.userDetails} />
      </div>
    </div>
  );
};

export default Body;
