import React from "react";
import "./Modal.css";
import styles from "./components.module.css";

// 수정, 삭제 선택 모달 컴포넌트
const EditModal = ({ isOpen, title, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">{title}</h3>
        <div className="modalButtons">
          <button
            className={`${styles.button} ${styles.longButton}`}
            onClick={onEdit}
          >
            수정
          </button>
          <button
            className={`${styles.button} ${styles.longButton}`}
            onClick={onDelete}
          >
            삭제
          </button>
          <button
            className={`${styles.button} ${styles.longButton}`}
            style={{ backgroundColor: "var(--color-background)" }}
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
