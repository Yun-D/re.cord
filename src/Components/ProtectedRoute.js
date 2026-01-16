// 조건 검사 후 자동 리다이렉트하도록 하는 컴포넌트
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const nickname = localStorage.getItem("nickname");
  if (nickname) {
    // 닉네임이 있으면 홈 페이지로 리다이렉트
    return <Navigate to="/record" replace />;
  }

  return children;
};

export default ProtectedRoute;
