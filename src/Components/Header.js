import React, { useState } from "react";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "./Drawer";
import "./Header.css";

const Header = () => {
  // 드로어 열림/닫힘 상태 관리
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 드로어 열기
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  // 드로어 닫기
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // 메뉴 항목 목록
  const menuItems = [
    { id: 1, label: "도움말", onClick: handleCloseDrawer },
    { id: 2, label: "버전 정보", onClick: handleCloseDrawer },
    { id: 3, label: "로그아웃", onClick: handleCloseDrawer },
  ];

  // 공통 버튼 스타일
  const buttonStyle = {
    background: "none",
    border: "none",
    fontSize: "var(--font-size-md)",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    padding: "8px 0",
  };

  return (
    <>
      <div className="header-bar">
        <Logo className="logo" />
        <button className="button" onClick={handleOpenDrawer}>
          <GiHamburgerMenu className="icon" />
        </button>
      </div>

      {/* 드로어 메뉴 */}
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <div style={{ padding: "20px" }}>
          <h2 style={{ margin: "0 0 20px", fontSize: "var(--font-size-lg)" }}>
            메뉴
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "16px" }}>
                <button style={buttonStyle} onClick={item.onClick}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
