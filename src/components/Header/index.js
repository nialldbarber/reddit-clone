import React from "react";
import logo from "assets/images/reddit-logo.svg";
import title from "assets/images/reddit-title.svg";

export default function Header() {
  return (
    <header>
      <div className="logo-wrap">
        <img className="logo" src={logo} alt="Reddit Logo" />
        <img className="title" src={title} alt="Reddit Title" />
      </div>
    </header>
  );
}
