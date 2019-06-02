import React from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Posts from "components/Posts";

export default function Homepage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <Posts />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
