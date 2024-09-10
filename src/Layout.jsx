import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";

export const Layout = () => {
  return (
    <div className="mx-10">
      <Header />
      <Outlet />
    </div>
  );
};
