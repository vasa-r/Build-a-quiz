import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteQuizModal.module.css";
import { deleteQuiz } from "../../../api/quiz";
import { toast } from "react-toastify";

const DeleteQuizModal = ({ modalSetter, id, isOpen, setDeleteId }) => {
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteQuiz(id);
      if (response.success || response.status === 200) {
        toast.success(response?.data?.message || "Quiz deleted successfully.");
        setDeleteId(null);
        modalSetter(false);
      } else {
        toast.error(response?.data?.message || "Failed to delete quiz.");
      }
    } catch (error) {
      toast.error("Couldn't delete quiz. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    modalSetter(false);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} ref={ref}>
        <h2>
          Are you confirm you <br /> want to delete ?
        </h2>

        <div className={styles.modalBtns}>
          <button
            className={styles.confirm}
            onClick={handleDelete}
            disabled={isLoading}
          >
            Confirm Delete
          </button>
          {isLoading && <div className={styles.loadingRing}></div>}
          <button className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
