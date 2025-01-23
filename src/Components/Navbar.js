import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as IcnHome } from "../Assets/home.svg";
import { ReactComponent as IcnRecord } from "../Assets/record.svg";
import { ReactComponent as IcnWish } from "../Assets/wish.svg";
import "./Navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(0);

  const handleMenu = (props) => {
    setActiveMenu(props);
  };

  const navItems = [
    {
      id: 0,
      href: "/home",
      icon: <IcnHome className="nav-icon" />,
      label: "홈",
    },
    {
      id: 1,
      href: "/record",
      icon: <IcnRecord className="nav-icon" />,
      label: "기록",
    },
    {
      id: 2,
      href: "/wish",
      icon: <IcnWish className="nav-icon" />,
      label: "위시",
    },
  ];

  return (
    <div className="nav-bar">
      {navItems.map((item, idx) => (
        <Link
          to={item.href}
          className={`nav-item ${activeMenu === idx ? "active" : ""}`}
          onClick={() => handleMenu(idx)}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
