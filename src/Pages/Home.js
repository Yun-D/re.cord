import React from "react";

const Home = () => {
  let username = "username"; //TODO: 추후 백엔드 작업 시 변경요

  return (
    <div>
      <h2 className="no-margin">{username}님, 오늘은 어디로 가볼까요?</h2>

      <div className="content-gap" />
      <div>
        <p className="text-title">최근 추가된 기록</p>

        <div className="recentRecords" />
      </div>
      <div className="content-gap" />
      <div>
        <p className="text-title">평점 분포</p>

        <div className="ratingSpread" />
      </div>
    </div>
  );
};

export default Home;
