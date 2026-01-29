import React, { useState, useEffect } from "react";
import styles from "./components.module.css";

const EditInputModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialValue,
  placeholder,
  isTextarea = false,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue || "");
    }
  }, [isOpen, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">{title}</h3>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          {isTextarea ? ( // prop으로 받은 isTextarea 값에 따라 textarea 또는 input 렌더링(ex. 핀 설명: textarea, 레코드 이름: input)
            <textarea
              className="editInput"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              rows="5"
              autoFocus
            />
          ) : (
            <input
              type="text"
              className="editInput"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              autoFocus
            />
          )}

          <div className="modalButtons" style={{ marginTop: "16px" }}>
            <button
              type="submit"
              className={`${styles.button} ${styles.longButton}`}
              disabled={!value.trim()}
            >
              저장
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.longButton}`}
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInputModal;
