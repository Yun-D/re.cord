import React from "react";
import styles from "./components.module.css";

const FloatingButton = ({ onClick, children }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default FloatingButton;
