import React from "react";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { ReactComponent as MoreHorizontal } from "../Assets/more_vert.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-bar">
      <Logo className="logo" />
      <button className="button">
        <MoreHorizontal className="icon" />
      </button>
    </div>
  );
};

export default Header;
