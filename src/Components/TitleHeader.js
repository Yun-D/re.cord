import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../Assets/arrow_back.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import useDrawer from "./useDrawer";
import DrawerMenu from "./DrawerMenu";
import "./Header.css";

const TitleHeader = ({ title, prevStep, step }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 드로어 상태 관리 훅 사용
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const isPinDetailPage = (path) =>
    path.includes("/recordDetail") && path.includes("/pinDetail");
  const isRecordDetailPage = (path) =>
    path.includes("/recordDetail") && !path.includes("/pinDetail");

  const handleBack = () => {
    const currentPath = location.pathname;

    if (step > 0 && typeof prevStep === "function") {
      // 멀티스텝폼 UI일 경우
      prevStep();
    } else if (isPinDetailPage(currentPath)) {
      // 핀 디테일 페이지일 경우 /pinDetail 제거하고 /recordDetail로 이동
      const basePath = currentPath.split("/pinDetail")[0];
      navigate(basePath);
    } else if (isRecordDetailPage(currentPath)) {
      // 레코드 디테일 페이지일 경우 /record 페이지로 바로 이동
      navigate("/record");
    } else {
      // 기본 뒤로가기
      navigate(-1);
    }
  };

  // 메뉴 항목 목록
  const menuItems = [
    { id: 1, label: "도움말", onClick: closeDrawer },
    { id: 2, label: "버전 정보", rightText: "ver. 0.1.0" }, //TODO: 버전 정보 업데이트
    { id: 3, label: "로그아웃", onClick: closeDrawer },
  ];

  return (
    <>
      <div className="header-bar">
        <button onClick={handleBack} className="button">
          <ArrowLeft className="icon" />
        </button>

        <h1 className="title">{title}</h1>

        <button className="button" onClick={openDrawer}>
          <GiHamburgerMenu className="icon" />
        </button>
      </div>

      {/* 드로어 메뉴 */}
      <DrawerMenu isOpen={isOpen} onClose={closeDrawer} menuItems={menuItems} />
    </>
  );
};

export default TitleHeader;
