import React from "react";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import useDrawer from "../Hooks/useDrawer";
import DrawerMenu from "./DrawerMenu";
import "./Header.css";

const Header = () => {
  // 드로어 상태 관리 훅 사용
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  // 메뉴 항목 목록
  const menuItems = [
    { id: 1, label: "도움말", onClick: closeDrawer },
    { id: 2, label: "버전 정보", rightText: "ver. 0.1.0" }, //TODO: 버전 정보 업데이트
    { id: 3, label: "로그아웃", onClick: closeDrawer },
  ];

  return (
    <>
      <div className="header-bar">
        <Logo className="logo" />
        <button className="button" onClick={openDrawer}>
          <GiHamburgerMenu className="icon" />
        </button>
      </div>

      {/* 드로어 메뉴 */}
      <DrawerMenu isOpen={isOpen} onClose={closeDrawer} menuItems={menuItems} />
    </>
  );
};

export default Header;
