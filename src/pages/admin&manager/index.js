import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Topbar from "./components/Topbar/index";
import "./style.scss";

function ManagePage() {
  const [collapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!collapsed);
  };

  return (
    <section className="manage-page">
      <div className={`manage-page__sidebar${collapsed ? "-collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`manage-page__main${collapsed ? "-collapsed" : ""}`}>
        <div className={`manage-page__top${collapsed ? "-collapsed" : ""}`}>
          <Topbar />
        </div>
        <div className={`manage-page__content${collapsed ? "-collapsed" : ""}`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default ManagePage;
