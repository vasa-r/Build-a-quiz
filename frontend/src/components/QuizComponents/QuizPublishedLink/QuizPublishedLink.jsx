import React, { useEffect, useRef } from "react";
import styles from "./QuizPublishedLink.module.css";
import Close from "../../../assets/close.svg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const QuizPublishedLink = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const link = `${window.location.origin}/live/${id}`;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        navigate("/main/dashboard");
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  const handleClose = () => {
    navigate("/main/dashboard");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to Clipboard");
    } catch (error) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.mainContainer} ref={ref}>
        <img src={Close} alt="close modal" onClick={handleClose} />
        <h1>
          Congrats your Quiz is <br /> Published!
        </h1>
        <div className={styles.link}>{link}</div>
        <button className={styles.share} onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default QuizPublishedLink;
