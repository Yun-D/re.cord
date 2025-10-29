import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function StarRating({ max = 5, value = 0, onChange }) {
  const [hover, setHover] = useState(null);

  // 마우스 위치에 따라 0.5점 단위 처리
  const handleMouseMove = (idx, e) => {
    const { left, width } = e.target.getBoundingClientRect();
    // 별의 x값이 중간보다 좌우냐로 0.5/1점 결정
    const x = e.clientX - left;
    setHover(x < width / 2 ? idx + 0.5 : idx + 1);
  };

  const handleClick = (idx, e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const newValue = x < width / 2 ? idx + 0.5 : idx + 1;

    // 선택된 값을 부모 onChange 콜백으로 전달
    if (onChange) onChange(newValue);
  };

  // 표시용 점수: 마우스 hover시 임시로 표시
  const displayValue = hover !== null ? hover : value;

  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: max }).map((_, i) => {
        let icon;
        if (displayValue >= i + 1) {
          icon = (
            <FaStar
              color={`var(--color-primary)`}
              stroke={`var(--color-line-black)`}
              strokeWidth={13}
            />
          );
        } else if (displayValue >= i + 0.5) {
          icon = (
            <FaStarHalfAlt
              color={`var(--color-primary)`}
              stroke={`var(--color-line-black)`}
              strokeWidth={13}
            />
          );
        } else {
          icon = <FaStar color={`var(--color-gray)`} />;
        }
        return (
          <span
            key={i}
            style={{ cursor: "pointer", fontSize: "2rem", marginRight: 4 }}
            onMouseMove={(e) => handleMouseMove(i, e)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => handleClick(i, e)}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
