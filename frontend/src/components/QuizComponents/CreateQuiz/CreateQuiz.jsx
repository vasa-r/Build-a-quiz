import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateQuiz.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizName,
  setQuizType,
  resetQuizData,
} from "../../../redux/slices/quizFieldSlice";
import { useNavigate } from "react-router-dom";
import { resetQuizQuestions } from "../../../redux/slices/quizQuestionSlice";

const CreateQuiz = () => {
  const [fieldError, setFieldError] = useState({});
  const { quizName, quizType } = useSelector((store) => store.fields);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const errors = {};

  useEffect(() => {
    dispatch(setQuizType(""));
  }, []);

  const handleNameChange = (e) => {
    dispatch(setQuizName(e.target.value));
  };

  const handleQnaClick = () => {
    dispatch(setQuizType("qNa"));
  };

  const handlePollClick = () => {
    dispatch(setQuizType("poll"));
  };

  const handleContinue = () => {
    if (quizName.trim() === "") {
      errors.quizName = "Quiz name is required";
      setFieldError(errors);
      return;
    }
    if (quizType.trim() === "") {
      errors.quizType = "Please choose any one type";
      setFieldError(errors);
      return;
    }
    navigate("/main/quiz/questions");
  };

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

  const handleCancel = () => {
    dispatch(resetQuizData());
    dispatch(resetQuizQuestions());
    navigate("/main/dashboard");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.createContainer} ref={ref}>
        <div className={styles.content}>
          <input
            type="text"
            placeholder="Quiz name"
            value={quizName}
            onChange={handleNameChange}
          />
          {<p className={styles.errorText}>{fieldError.quizName}</p>}
          <div className={styles.quizType}>
            <p className={styles.heading}>Quiz Type</p>
            <p
              className={`${styles.option} ${
                quizType === "qNa" ? styles.selected : ""
              } `}
              onClick={handleQnaClick}
            >
              Q & A
            </p>
            <p
              className={`${styles.option} ${
                quizType === "poll" ? styles.selected : ""
              } `}
              onClick={handlePollClick}
            >
              Poll Type
            </p>
          </div>
          {<p className={styles.errorText}>{fieldError.quizType}</p>}
        </div>
        <div className={styles.quizBtns}>
          <button className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.continue} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
