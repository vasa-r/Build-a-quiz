import React, { useEffect, useRef } from "react";
import styles from "./DeleteQuizModal.module.css";

const DeleteQuizModal = ({ modalSetter }) => {
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        modalSetter(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, modalSetter]);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} ref={ref}>
        <h2>
          Are you confirm you <br /> want to delete ?
        </h2>
        <div className={styles.modalBtns}>
          <button className={styles.confirm}>Confirm Delete</button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
