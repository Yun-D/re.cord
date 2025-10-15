import React, { useEffect, useState } from "react";
import FloatingButton from "../../Components/FloatingButton";

import { ReactComponent as IcnFolder } from "../../Assets/folder.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import "./RecordDetail.css";
import { Link, useParams } from "react-router-dom";
import TagListItem from "../../Components/TagListItem";

import { fetchRecords } from "../../firebase/firestore/recordsCRUD";
import { fetchPins } from "../../firebase/firestore/pinsCRUD";
import KakaoMap from "../../Components/KakaoMap";

const RecordDetail = () => {
  const dummy = {
    //FIXME: 실제 데이터로 변경해야함
    pinCount: 2,
    memoCount: 3,
  };

  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currRecord, setCurrRecord] = useState([]); // 현재 레코드 정보
  const [pins, setPins] = useState([]);

  const { recordId } = useParams(); // URL 파라미터에서 recordId 추출
  useEffect(() => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    const loadUserPins = async () => {
      try {
        setLoading(true);
        const data = await fetchRecords(user, recordId); // 모든 레코드 불러오기
        const record = data.find((item) => item.recordId === recordId); // 현재 레코드 찾기
        setCurrRecord(record);

        const pinsData = await fetchPins(user, recordId); // 현재 레코드의 핀 불러오기

        if (record && pinsData.length > 0) {
          setIsEmpty(false);
          setPins(pinsData);
        } else {
          setPins([]);
        }
      } catch (error) {
        console.error("Error fetching records: ", error);
        setIsEmpty(true);
        setPins([]); // 에러 시 핀 배열 초기화
      } finally {
        setLoading(false);
      }
    };

    loadUserPins();
  }, [recordId]);

  if (loading) return <div>로딩중...</div>;
  return (
    <div>
      {/* 상단, 레코드 정보 부분 영역 */}

      <div className="row-direction">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">{currRecord.name}</p>
        </div>

        <div className="dataSummary">
          <p className="d-icon-sm">📍</p>
          <p className="no-margin">{pins.length}</p>
          <p className="d-icon-sm">✏️</p>
          <p className="no-margin">{dummy.memoCount}</p>
        </div>
      </div>
      {/* -------------------- */}

      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 장소가 없어요.
              <br />
              버튼을 눌러 핀을 추가해볼까요?
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
            }}
          >
            <KakaoMap pins={pins} isMultiple={true} />
          </div>

          {pins.map((pin) => (
            <Link
              to={`/pinDetail/${pin.pinId}`}
              state={{ currPin: pin, recordId: recordId }}
              key={pin.pinId}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TagListItem
                key={pin.pinId}
                shop={pin.place_name}
                recentDate={"2025.10.07"}
              />
            </Link>
          ))}
        </div>
      )}

      <Link to="/addPin" state={{ recordId: recordId }}>
        <FloatingButton>
          <IcnEdit />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default RecordDetail;
