import React, { useEffect } from "react";
import "./Drawer.css";

/**
 * Drawer 컴포넌트
 *
 * 오른쪽에서 슬라이드 인되는 사이드 메뉴입니다.
 *
 * @param {boolean} isOpen - 드로어 열림/닫힘 상태
 * @param {function} onClose - 드로어를 닫는 함수
 * @param {ReactNode} children - 드로어 내부에 표시할 컨텐츠
 */
const Drawer = ({ isOpen, onClose, children }) => {
  // ESC 키로 드로어 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // 드로어가 열릴 때 body 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 - 클릭 시 드로어 닫기 */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* 드로어 메뉴 */}
      <div className={`drawer ${isOpen ? "drawer-open" : ""}`}>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
