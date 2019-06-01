import React from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";

export default function Homepage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <p>im the content</p>
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
