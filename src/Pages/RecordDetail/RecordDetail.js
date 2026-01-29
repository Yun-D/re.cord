import React, { useEffect, useState } from "react";
import FloatingButton from "../../Components/FloatingButton";
import EditModal from "../../Components/EditModal";

import { ReactComponent as IcnFolder } from "../../Assets/folder.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import { IoIosMore } from "react-icons/io";
import "./RecordDetail.css";
import styles from "../../Components/components.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecordPinCard from "../../Components/RecordPinCard";

import {
  deleteRecord,
  fetchRecords,
  updateRecordName,
} from "../../firebase/firestore/recordsCRUD";
import { fetchPins } from "../../firebase/firestore/pinsCRUD";
import KakaoMap from "../../Components/KakaoMap";
import EditInputModal from "../../Components/EditInputModal";

const RecordDetail = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currRecord, setCurrRecord] = useState([]); // 현재 레코드 정보
  const [pins, setPins] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);

  const navigate = useNavigate();
  const { recordId } = useParams(); // URL 파라미터에서 recordId 추출

  const loadUserPins = async () => {
    try {
      setLoading(true);

      // const auth = getAuth();
      // const user = auth.currentUser;
      const user = localStorage.getItem("anonUserid");

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

  // 모달 관련 핸들러
  const handleModalEdit = () => {
    setIsEditModalOpen(false);
    setIsEditNameModalOpen(true);
  };

  // 레코드 삭제 핸들러
  const handleRecordDelete = async () => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    if (window.confirm("정말 이 레코드를 삭제하시겠습니까?")) {
      try {
        await deleteRecord(user, recordId);
        alert("레코드가 삭제되었습니다.");
        setIsEditModalOpen(false);

        navigate("/record");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 레코드 이름 수정 저장 핸들러
  const handleUpdateRecordName = async (newName) => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    try {
      await updateRecordName(user, recordId, newName);
      alert("레코드 이름이 수정되었습니다.");
      setIsEditNameModalOpen(false);

      loadUserPins();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // ------------------------------------
  useEffect(() => {
    loadUserPins();
  }, [recordId]);

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
            <p className="no-margin">{currRecord.totalMemoCount ?? 0}</p>
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
        onDelete={handleRecordDelete}
      />
      <EditInputModal
        isOpen={isEditNameModalOpen}
        onClose={() => setIsEditNameModalOpen(false)}
        onSave={handleUpdateRecordName}
        title={"레코드 이름 수정"}
        fieldName={"recordName"}
        initialValue={currRecord.name}
        placeholder={"변경할 레코드 이름을 입력해주세요."}
        isTextarea={false}
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
