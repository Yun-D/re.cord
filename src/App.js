import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactComponent as IcnHome } from "./Assets/home.svg";
import { ReactComponent as IcnRecord } from "./Assets/record.svg";
import { ReactComponent as IcnWish } from "./Assets/wish.svg";

function App() {
  const [activeMenu, setActiveMenu] = useState();

  const handleMenu = (props) => {
    setActiveMenu(props);
  };

  const navItems = [
    {
      id: 1,
      href: "#home",
      icon: <IcnHome className="nav-icon" />,
      label: "홈",
    },
    {
      id: 2,
      href: "#record",
      icon: <IcnRecord className="nav-icon" />,
      label: "기록",
    },
    {
      id: 3,
      href: "#wish",
      icon: <IcnWish className="nav-icon" />,
      label: "위시",
    },
  ];

  return (
    <div className="app-container">
      <div className="box-wrapper">
        <div className="content">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="nav-bar">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item ${activeMenu === idx ? "active" : ""}`}
              onClick={() => handleMenu(idx)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
