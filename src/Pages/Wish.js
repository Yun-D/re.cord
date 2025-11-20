import React, { useState } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const Wish = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  //TODO: 데이터 요청 후 바로 setIsEmpty 설정하는 코드 추가

  return (
    <div>
      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 위시가 없어요.
              <br />
              만들어볼까요?
            </p>
            <Link to="/addPin" state={{ isWish: true }}>
              <Button>위시 등록하기</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Wish;
