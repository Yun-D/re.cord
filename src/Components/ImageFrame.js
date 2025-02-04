import React from "react";
import styles from "./components.module.css";

const ImageFrame = ({ imageSrc }) => {
  return (
    <div className={styles.outerSquare}>
      <div className={styles.innerSquare}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Inside Content"
            className={styles.innerImage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ImageFrame;
