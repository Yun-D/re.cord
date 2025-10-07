import React, { useEffect, useRef } from "react";

const { kakao } = window;

// pins: 장소 데이터 혹은 장소 데이터 배열
// isMultiple: pins가 배열인지 단일 객체인지 여부
const KakaoMap = ({ pins, isMultiple }) => {
  const container = useRef(null); //지도 컨테이너 접근

  useEffect(() => {
    if (!pins || pins.length === 0) return;

    // isMultiple이 true일 경우 pins는 배열, false일 경우 단일 객체
    if (isMultiple) {
      const center = new kakao.maps.LatLng(
        Number(pins[0].lat),
        Number(pins[0].lng)
      ); //지도의 중심좌표는 pins의 첫번째 좌표
      const options = {
        center: center,
        level: 3, //지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

      pins.forEach((pin) => {
        // 배열의 pin마다 마커 생성
        const position = new kakao.maps.LatLng(
          Number(pin.lat),
          Number(pin.lng)
        );
        const marker = new kakao.maps.Marker({
          position: position,
        });
        marker.setMap(map);
      });
    } else {
      const position = new kakao.maps.LatLng(pins.lat, pins.lng);
      const options = {
        center: position,
        level: 3, //지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

      const marker = new kakao.maps.Marker({
        position: position,
      });
      marker.setMap(map);
    }
  }, [pins, isMultiple]);

  return (
    <div style={{ width: "500px", height: "270px" }} ref={container}></div>
  );
};

export default KakaoMap;
