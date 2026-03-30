import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./LayoutDefault.scss";

function LayoutDefault() {
  return (
    <div className="layout-default">
      <Header />
      <main className="layout-default__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutDefault;
