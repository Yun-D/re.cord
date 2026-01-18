import React from "react";
import Drawer from "./Drawer";

/**
 * DrawerMenu 컴포넌트
 *
 * 드로어 메뉴의 공통 UI를 제공하는 컴포넌트입니다.
 *
 * @param {boolean} isOpen - 드로어 열림/닫힘 상태
 * @param {function} onClose - 드로어를 닫는 함수
 * @param {array} menuItems - 메뉴 항목 배열 [{ id, label, onClick }, ...]
 */
const DrawerMenu = ({ isOpen, onClose, menuItems = [] }) => {
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
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div style={{ padding: "20px" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: "var(--font-size-lg)" }}>
          메뉴
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "14px" }}>
              <button
                style={{
                  ...buttonStyle,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: item.onClick ? "pointer" : "default", // onClick이 있으면 커서 포인터, 없으면 기본
                }}
                onClick={item.onClick}
              >
                <span>{item.label}</span>
                {item.rightText && (
                  <span
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-gray)",
                    }}
                  >
                    {item.rightText}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

export default DrawerMenu;
