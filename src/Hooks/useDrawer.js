import { useState } from "react";

/**
 * 드로어 메뉴 상태 관리를 위한 커스텀 훅
 *
 * @returns {object} { isOpen, openDrawer, closeDrawer }
 */
const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false); // 드로어 열림/닫힘 상태 관리

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
};

export default useDrawer;
