import React from "react";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-bar">
      <Logo className="logo" />
    </div>
  );
};

export default Header;
