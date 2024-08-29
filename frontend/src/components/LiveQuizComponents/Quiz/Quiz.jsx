import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Quiz.module.css";
import { getSingleQuiz, updateAnalytic } from "../../../api/liveQuiz";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setQuizData } from "../../../redux/slices/quizFieldSlice";
import { setQuestions } from "../../../redux/slices/quizQuestionSlice";
import QnaEnd from "../QnaEnd/QnaEnd";
import PollEnd from "../PollEnd/PollEnd";

const Quiz = () => {
  const [selected, setSelected] = useState(null);
  const [currQuestion, setCurrQuestion] = useState(1);
  const { quizType } = useSelector((store) => store.fields);
  const quizQuestions = useSelector((store) => store.questions);
  const [showQnaEnd, setShowQnaEnd] = useState(false);
  const [showPollEnd, setShowPollEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [updatedCorrectAnswers, setUpdatedCorrectAnswers] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectedQuestionData = quizQuestions.find(
    (q) => q.questionNo === currQuestion
  );
  const [timer, setTimer] = useState(selectedQuestionData?.timer);
  const timerIntervalRef = useRef(null);
  const selectedRef = useRef(selected);

  useEffect(() => {
    if (id && id.trim() !== "") {
      getOldQuiz(id);
    }
  }, [id]);

  useEffect(() => {
    clearInterval(timerIntervalRef.current);
    setTimer(selectedQuestionData?.timer);
    setUpdatedCorrectAnswers(false);

    if (
      selectedQuestionData?.timer !== null &&
      selectedQuestionData?.timer > 0
    ) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerIntervalRef.current);
            handleNext(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [selectedQuestionData]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (selectedRef.current !== null && !updatedCorrectAnswers) {
      const isCorrect =
        selectedQuestionData.correctAnswer === selectedRef.current + 1;

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setUpdatedCorrectAnswers(true);
      }
    }
  }, [selected]);

  const handleNext = useCallback(
    async (autoNext = false) => {
      //to check if the timer is null (no timer) and no option is selected
      setIsLoading(true);
      if (
        !autoNext &&
        selectedQuestionData?.timer === null &&
        selectedRef.current === null
      ) {
        toast.error("Please choose an option before proceeding further");
        return;
      }

      // Check if the timer ran out and no option is selected
      if (autoNext && selectedRef.current === null) {
        await updateAnalytics(
          id,
          currQuestion,
          1,
          0, // answeredCorrectly
          1, // answeredIncorrectly
          new Array(
            selectedQuestionData.options[
              selectedQuestionData.optionType
            ]?.length
          ).fill(0)
        );
      } else {
        // Check whether the selected option is correct
        const isCorrect =
          selectedQuestionData.correctAnswer === selectedRef.current + 1;

        // Option choosed array
        let optionChoosed;
        if (selectedQuestionData.optionType === "textNimage") {
          optionChoosed = new Array(
            selectedQuestionData.options.text?.length
          ).fill(0);
        } else {
          optionChoosed = new Array(
            selectedQuestionData.options[
              selectedQuestionData.optionType
            ]?.length
          ).fill(0);
        }

        if (selectedRef.current !== null) {
          optionChoosed[selectedRef.current] = 1;
        }

        try {
          await updateAnalytics(
            id,
            currQuestion,
            1,
            isCorrect ? 1 : 0,
            isCorrect ? 0 : 1,
            optionChoosed
          );

          // Only increment correctAnswers if the answer was correct
          if (isCorrect && !updatedCorrectAnswers) {
            setCorrectAnswers((prev) => prev + 1);
            setUpdatedCorrectAnswers(true);
          }
        } catch (error) {
          toast.error("Try again later");
        } finally {
          setIsLoading(false);
        }
      }

      // To check for end page
      if (currQuestion < quizQuestions.length) {
        setCurrQuestion((prev) => prev + 1);
        setSelected(null);
      } else {
        clearInterval(timerIntervalRef.current);
        if (quizType === "qNa") {
          setShowQnaEnd(true);
        } else if (quizType === "poll") {
          setShowPollEnd(true);
        }
      }
    },
    [
      selected,
      currQuestion,
      quizQuestions.length,
      quizType,
      id,
      updatedCorrectAnswers,
    ]
  );

  const getOldQuiz = async () => {
    try {
      const response = await getSingleQuiz(id);

      if (response.success || response.status === 200) {
        const { data } = response.data;
        dispatch(
          setQuizData({ quizName: data.quizName, quizType: data.quizType })
        );

        dispatch(setQuestions(data.quizQuestions));
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't fetch quiz. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching quiz. Please try again later."
      );
    }
  };

  const updateAnalytics = async (
    id,
    questionNo,
    peopleAttempted,
    answeredCorrectly,
    answeredIncorrectly,
    optionChoosed
  ) => {
    try {
      const response = await updateAnalytic(
        id,
        questionNo,
        peopleAttempted,
        answeredCorrectly,
        answeredIncorrectly,
        optionChoosed
      );

      if (response.success || response.status === 200) {
        const { data } = response.data;
        dispatch(
          setQuizData({ quizName: data.quizName, quizType: data.quizType })
        );

        dispatch(setQuestions(data.quizQuestions));
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't fetch quiz. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching quiz. Please try again later."
      );
    }
  };

  if (showQnaEnd)
    return (
      <QnaEnd
        correctAnswers={correctAnswers}
        totalQuestions={quizQuestions.length}
      />
    );
  if (showPollEnd) return <PollEnd />;

  return (
    <>
      <div className={styles.quizWrapper}>
        <div className={styles.innerContainer}>
          <div className={styles.topData}>
            <div className={styles.qstnNumber}>
              0{currQuestion}/0{quizQuestions.length}
            </div>
            {selectedQuestionData?.timer !== null && (
              <div className={styles.timer}>
                {`00:${timer < 10 ? "0" : ""}`}
                {timer}s
              </div>
            )}
          </div>
          <h1 className={styles.question}>{selectedQuestionData?.question}</h1>
          {selectedQuestionData?.optionType === "text" && (
            <div className={styles.answerOptions}>
              {selectedQuestionData?.options?.text.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    selected === index ? styles.selectedOption : ""
                  }`}
                  onClick={() => setSelected(index)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
          {selectedQuestionData?.optionType === "image" && (
            <div className={styles.answerImageOptions}>
              {selectedQuestionData.options?.image.map((image, index) => (
                <div
                  key={index}
                  className={styles.imageOption}
                  onClick={() => setSelected(index)}
                >
                  <img
                    className={selected === index ? styles.selectedOption : ""}
                    src={image}
                    alt={`option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
          {selectedQuestionData?.optionType === "textNimage" && (
            <div className={styles.answerImageOptions}>
              {selectedQuestionData?.options?.text.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.textNimageOption} ${
                    selected === index ? styles.selectedOption : ""
                  }`}
                  onClick={() => setSelected(index)}
                >
                  <p>{item}</p>
                  <img
                    src={selectedQuestionData?.options?.image[index]}
                    alt={`option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
          {isCreating && <div className={styles.loadingRing}></div>}
          <button
            className={styles.LiveQuizButton}
            onClick={() => handleNext(false)}
            disabled={isLoading}
          >
            {currQuestion < quizQuestions.length ? "NEXT" : "SUBMIT"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
