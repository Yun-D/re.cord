import React, { useEffect, useState } from "react";

import { ReactComponent as IcnFolder } from "../../Assets/folder_open.svg";
import { ReactComponent as IcnEdit } from "../../Assets/edit.svg";
import { IoIosMore } from "react-icons/io";

import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchRecords } from "../../firebase/firestore/recordsCRUD";
import "../RecordDetail/RecordDetail.css";
import styles from "../../Components/components.module.css";
import FloatingButton from "../../Components/FloatingButton";
import {
  deletePin,
  fetchMemos,
  fetchPins,
  updatePinDesc,
} from "../../firebase/firestore/pinsCRUD";
import PinMemoCard from "../../Components/PinMemoCard";
import EditModal from "../../Components/EditModal";
import EditInputModal from "../../Components/EditInputModal";

const PinDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  const [currRecordName, setCurrRecordName] = useState(""); // 현재 레코드 이름
  const [pinData, setPinData] = useState("");
  const [pinMemos, setPinMemos] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditDescModalOpen, setIsEditDescModalOpen] = useState(false);

  const loadUserMemos = async () => {
    try {
      setLoading(true);

      // const auth = getAuth();
      // const user = auth.currentUser;
      const user = localStorage.getItem("anonUserid");

      // 레코드 데이터 페칭 FIXME: 나중에 이부분은 리팩토링 필요(중복제거)
      const rData = await fetchRecords(user); // 모든 레코드 불러오기
      const recordId = params.recordId;
      const currRecord = rData.find((item) => item.recordId === recordId);
      setCurrRecordName(currRecord.name);

      // 핀 데이터 페칭
      const pData = await fetchPins(user, recordId); // 현재 레코드의 핀 불러오기
      const currPin = pData.find((item) => item.pinId === params.pinId);
      setPinData(currPin);

      // 메모 데이터 페칭
      const memoData = await fetchMemos(user, recordId, currPin.pinId);
      setPinMemos(memoData);

      if (memoData.length > 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.error("Error fetching pins: ", error);
      setIsEmpty(true);
    } finally {
      setLoading(false);
    }
  };

  // 메모 삭제 후 메모 리스트 다시 불러오기
  const handleMemoDeleteSuccess = () => {
    loadUserMemos();
  };

  // 모달 관련 핸들러 -----------------------------------
  const handleModalEdit = () => {
    setIsEditModalOpen(false);
    setIsEditDescModalOpen(true);
  };

  // 핀 삭제 핸들러
  const handlePinDelete = async () => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    if (window.confirm("정말 이 핀을 삭제하시겠습니까?")) {
      try {
        await deletePin(user, params.recordId, params.pinId);
        alert("핀이 삭제되었습니다.");
        setIsEditModalOpen(false);

        navigate("/recordDetail/" + params.recordId);
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 핀 설명 저장 핸들러
  const handleUpdatePinDesc = async (newDesc) => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const user = localStorage.getItem("anonUserid");

    try {
      await updatePinDesc(user, params.recordId, params.pinId, newDesc);
      alert("핀 설명이 수정되었습니다.");
      setIsEditDescModalOpen(false);

      loadUserMemos();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };
  // ------------------------------------------------

  useEffect(() => {
    loadUserMemos();
  }, []);

  if (loading) return <div>로딩중...</div>;
  return (
    <div>
      <div className="row-direction-between">
        <div className="title-container">
          <IcnFolder className="d-icon" />
          <p className="title">
            {currRecordName} / {pinData.place_name}
          </p>
        </div>

        <button
          className={`${styles.button} ${styles.deleteBtn}`}
          style={{ backgroundColor: "white" }}
          onClick={() => setIsEditModalOpen(true)}
        >
          <IoIosMore />
        </button>
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "100%",
          height: "64px",
          marginTop: "8px",
          padding: "10px",
          overflow: "auto",
          wordWrap: "break-word",
        }}
      >
        {pinData.pinDesc}
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        title={"핀 관리"}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleModalEdit}
        onDelete={handlePinDelete}
      />
      <EditInputModal
        isOpen={isEditDescModalOpen}
        onClose={() => setIsEditDescModalOpen(false)}
        onSave={handleUpdatePinDesc}
        title={"핀 설명 수정"}
        fieldName={"pinDesc"}
        initialValue={pinData.pinDesc}
        placeholder={"변경할 핀 설명을 입력해주세요."}
        isTextarea={true}
      />

      {isEmpty ? (
        <div className="container">
          <div className="content-align">
            <p>
              저장된 메모가 없어요.
              <br />
              버튼을 눌러 나의 재방문 기록을 추가해보세요.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "48px" }}>
          {pinMemos.map((item) => (
            <PinMemoCard
              key={item.memoId}
              memoId={item.memoId}
              pinId={pinData.pinId}
              recordId={pinData.recordId}
              date={item.date}
              title={item.title}
              review={item.review}
              rating={item.rating}
              onDeleteSuccess={handleMemoDeleteSuccess} // 삭제 성공 콜백
            />
          ))}
        </div>
      )}

      <Link
        to="/addMemo"
        state={{
          place_name: pinData.place_name,
          address: pinData.address,
          recordId: pinData.recordId,
          pinId: pinData.pinId,
        }}
      >
        <FloatingButton>
          <IcnEdit />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default PinDetail;
