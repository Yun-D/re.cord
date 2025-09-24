import React, { useEffect, useRef } from "react";

const { kakao } = window;

const KakaoMap = ({ lat, lng }) => {
  const container = useRef(null); //지도 컨테이너 접근

  useEffect(() => {
    const position = new kakao.maps.LatLng(lat, lng); //지도의 중심좌표
    const options = {
      center: position,
      level: 3, //지도의 확대 레벨
    };
    const map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

    const marker = new kakao.maps.Marker({
      position: position,
    });
    marker.setMap(map);
  }, [lat, lng]);

  return (
    <div style={{ width: "500px", height: "270px" }} ref={container}></div>
  );
};

export default KakaoMap;
