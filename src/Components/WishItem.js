import React from "react";
import { deleteWish } from "../firebase/firestore/wishesCRUD";
import styles from "./components.module.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

const WishItem = ({
  place_name,
  pinDesc,
  address,
  wishId,
  onDeleteSuccess,
}) => {
  // const auth = getAuth();
  // const user = auth.currentUser;
  const user = localStorage.getItem("anonUserid");

  const handleDelete = async () => {
    const isConfirmed = window.confirm("이 위시를 삭제할까요?");
    if (isConfirmed) {
      try {
        await deleteWish(user, wishId);
        onDeleteSuccess(); // 부모 컴포넌트에 삭제 성공 알림
        console.log("Wish deleted successfully");
      } catch (error) {
        console.error("Error deleting wish: ", error);
      }
    }
  };

  return (
    <div className={styles.r_listContainer}>
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
            <h4 className={styles.dataTxt}>{place_name}</h4>
            <p className={styles.dataTxt}>{address}</p>
          </div>

          <div className="row-direction" style={{ gap: "10px" }}>
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

        <p className={styles.r_memoTxt}>{pinDesc}</p>
      </div>
    </div>
  );
};

export default WishItem;
