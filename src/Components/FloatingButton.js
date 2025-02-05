import React from "react";
import styles from "./components.module.css";
import { ReactComponent as IconEdit } from "../Assets/edit.svg";

const FloatingButton = ({ onClick }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      <IconEdit />
    </button>
  );
};

export default FloatingButton;
