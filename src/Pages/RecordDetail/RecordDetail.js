import React, { useEffect, useState } from "react";
import FloatingButton from "../../Components/FloatingButton";
import EditModal from "../../Components/EditModal";

import { ReactComponent as IcnFolder } from "../../Assets/folder.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import { IoIosMore } from "react-icons/io";
import "./RecordDetail.css";
import styles from "../../Components/components.module.css";
import { Link, useParams } from "react-router-dom";
import RecordPinCard from "../../Components/RecordPinCard";

import { fetchRecords } from "../../firebase/firestore/recordsCRUD";
import { fetchPins } from "../../firebase/firestore/pinsCRUD";
import KakaoMap from "../../Components/KakaoMap";

const RecordDetail = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currRecord, setCurrRecord] = useState([]); // 현재 레코드 정보
  const [pins, setPins] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // 모달 관련 핸들러
  const handleModalEdit = () => {
    setIsEditModalOpen(false);
    // TODO: 레코드 이름 수정 구현 필요
  };

  const handleModalDelete = async () => {
    if (window.confirm("정말 이 레코드를 삭제하시겠습니까?")) {
      try {
        // await 레코드 삭제 TODO: 레코드 삭제 함수 구현 필요
        alert("레코드가 삭제되었습니다.");
        setIsEditModalOpen(false);
        // 페이지 리로드 또는 상태 업데이트 필요
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      {/* 상단, 레코드 정보 부분 영역 */}
      <div className="row-direction-between">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">{currRecord.name}</p>
        </div>

        <div className="row-direction">
          <div className="dataSummary">
            <p className="d-icon-sm">📍</p>
            <p className="no-margin">{pins.length}</p>
            <p className="d-icon-sm">✏️</p>
            <p className="no-margin">{currRecord.totalMemoCount}</p>
          </div>

          <div style={{ width: 20 }}></div>
          <button
            className={`${styles.button} ${styles.deleteBtn}`}
            style={{ backgroundColor: "white" }}
            onClick={() => setIsEditModalOpen(true)}
          >
            <IoIosMore />
          </button>
        </div>
      </div>
      {/* -------------------- */}
      <EditModal
        isOpen={isEditModalOpen}
        title={"레코드 관리"}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleModalEdit}
        onDelete={handleModalDelete}
      />

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
              to={`/recordDetail/${recordId}/pinDetail/${pin.pinId}`}
              //state={{ currPin: pin, recordId: recordId }}
              key={pin.pinId}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RecordPinCard
                key={pin.pinId}
                shop={pin.place_name}
                ratingAvg={pin.avgRating ?? "-"}
                memoCount={pin.memoCount ?? 0}
                lastUpdated={
                  pin.lastUpdated?.toDate().toLocaleString().slice(0, 12) || ""
                }
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
