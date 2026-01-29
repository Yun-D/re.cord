// 핀 만들기 1단계 (장소 검색) -------------------------------
import React, { useRef, useState } from "react";

import styles from "../../../Components/components.module.css";
import "../../Records.css";

import { ReactComponent as IcnSearch } from "../../../Assets/search.svg";
import PlaceSearchCard from "../../../Components/PlaceSearchCard";

const { kakao } = window;

const PinStep1 = ({ pinData, setPinData, nextStep }) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [places, setPlaces] = useState([]); // 검색 결과
  const [error, setError] = useState(""); // 에러메시지 상태관리

  //페이지네이션 관리
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [currPage, setCurrPage] = useState(1);

  const inputRef = useRef(null);

  // 키워드 검색 요청 핸들러 & 상태관리
  const searchPlaces = (page = 1) => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    setError("");

    const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면 검색 목록 표출
          setPlaces(data);

          // 페이지네이션 정보 관리
          setPaginationInfo({
            total: pagination.last, // 총 페이지 수
            paginationObj: pagination, // 페이지네이션 객체
          });
          setCurrPage(page);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setError("검색 결과가 존재하지 않습니다.");
          setPlaces([]);
          setPaginationInfo(null);
        } else if (status === kakao.maps.services.Status.ERROR) {
          setError("검색 결과 중 오류가 발생했습니다.");
          setPlaces([]);
          setPaginationInfo(null);
        }
      },
      { page },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlaces(1);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNum) => {
    if (pageNum !== currPage) {
      searchPlaces(pageNum);
    }
  };

  return (
    <div>
      <div className={styles.borderBox}>
        <form id="search" className="row-direction" onSubmit={handleSubmit}>
          <IcnSearch />
          <input
            type="text"
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder=" 기억하고싶은 장소를 검색하세요."
            className="inputbox"
          />
        </form>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러메시지 출력 */}
      <ul style={{ padding: "0 0 0 10px" }}>
        {places.map((place) => (
          <PlaceSearchCard
            key={place.id}
            onClick={() => {
              setPinData({
                ...pinData,
                place_name: place.place_name,
                address: place.road_address_name || place.address_name,
                lat: place.y,
                lng: place.x,
              });
              nextStep();
            }}
            place={place.place_name}
            address={place.road_address_name || place.address_name}
          />
        ))}
      </ul>
      {paginationInfo && paginationInfo.total > 1 && (
        <div style={{ marginTop: 60, textAlign: "center" }}>
          {Array.from({ length: paginationInfo.total }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor:
                    pageNum === currPage ? `var(--color-primary)` : "white",
                  color: pageNum === currPage ? "black" : "black",
                  border: "1px solid var(--color-line-black)",
                  cursor: "pointer",
                }}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default PinStep1;
