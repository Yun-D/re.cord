import React from "react";
import styles from "./components.module.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteMemo } from "../firebase/firestore/pinsCRUD";

const ReviewMemoCard = ({
  date,
  title,
  review,
  rating,
  recordId,
  pinId,
  memoId,
  onDeleteSuccess,
}) => {
  // const auth = getAuth();
  // const user = auth.currentUser;
  const user = localStorage.getItem("anonUserid");

  const handleDelete = async () => {
    const isConfirmed = window.confirm("이 메모를 삭제할까요?");
    if (isConfirmed) {
      try {
        await deleteMemo(user, recordId, pinId, memoId);
        onDeleteSuccess(); // 부모 컴포넌트에 삭제 성공 알림
        console.log("Memo deleted successfully");
      } catch (error) {
        console.error("Error deleting memo: ", error);
      }
    }
  };

  return (
    <div className={styles.r_listContainer}>
      <div
        style={{
          width: "72px",
          height: "72px",
          flexShrink: 0,
          border: `var(--border-size) solid var(--color-line-black)`,
        }}
        //사진 영역
      />

      <div
        style={{ flexDirection: "column", marginLeft: "15px", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4 className={styles.dataTxt}>{date}</h4>
            <h4 className={styles.dataTxt}>{title}</h4>
          </div>

          <div className="row-direction" style={{ gap: "10px" }}>
            <div
              className={styles.borderBoxTag}
              style={{ width: "70px", height: "33px" }}
            >
              ⭐ {rating}
            </div>
            <button
              className={`${styles.button} ${styles.deleteBtn}`}
              onClick={handleDelete}
            >
              <RiDeleteBin5Fill
                size={15}
                style={{ color: `var(--color-line-black)` }}
              />
            </button>
          </div>
        </div>

        <p className={styles.r_memoTxt}>{review}</p>
      </div>
    </div>
  );
};

export default ReviewMemoCard;
