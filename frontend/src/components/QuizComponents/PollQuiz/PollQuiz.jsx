import React, { useEffect, useState } from "react";
import styles from "./Pollquiz.module.css";
import Cross from "../../../assets/cross.svg";
import Plus from "../../../assets/plus.svg";
import Delete from "../../../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addQuestions,
  removeQuestion,
  updateQuestion,
  addOptions,
  removeOptions,
  resetOptions,
  resetQuizQuestions,
  setQuestions,
} from "../../../redux/slices/quizQuestionSlice";
import {
  resetQuizData,
  setQuizData,
  setQuizType,
} from "../../../redux/slices/quizFieldSlice";
import { toast } from "react-toastify";
import useValidatePollQuiz from "../../../hooks/useValidatePollQuiz";
import { createQuiz, getOneQuiz, updateQuiz } from "../../../api/quiz";

const PollQuiz = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [error, setError] = useState(null);
  const [quizId, setQuizId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { quizName, quizType } = useSelector((store) => store.fields);
  const quizQuestions = useSelector((store) => store.questions);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    setQuizId(id);
    if (quizId && quizId.trim() !== "") {
      getOldQuiz(id);
    }
  }, [quizId]);

  const selectedQuestionData = quizQuestions.find(
    (q) => q.questionNo === selectedQuestion
  );

  const handleAddQuestion = () => {
    if (!selectedQuestionData) return;
    const qstnError = useValidatePollQuiz(
      quizQuestions[quizQuestions.length - 1]
    );

    if (Object.keys(qstnError).length !== 0) {
      setError((prevError) => ({
        ...prevError,
        [quizQuestions[quizQuestions.length - 1].questionNo]: qstnError,
      }));
      return;
    } else {
      setError((prevError) => ({
        ...prevError,
        [quizQuestions[quizQuestions.length - 1].questionNo]: {},
      }));
    }

    if (quizQuestions.length < 5) {
      const newQuestionNo = quizQuestions.length + 1;
      setSelectedQuestion(newQuestionNo);
      dispatch(addQuestions());
    }
    return;
  };

  const handleQuestionSelect = (questionNo) => {
    setSelectedQuestion(questionNo);
  };

  const handleRemoveQuestion = (index) => {
    if (quizQuestions[index].questionNo === selectedQuestion) {
      setSelectedQuestion(index > 0 ? quizQuestions[index - 1].questionNo : 2);
    } else if (quizQuestions[index].questionNo < selectedQuestion) {
      setSelectedQuestion(selectedQuestion - 1);
    }

    dispatch(removeQuestion(index));
  };

  const handleQuestionName = (e, questionNo) => {
    const { value } = e.target;
    dispatch(updateQuestion({ questionNo, question: value }));
  };

  const handleOptionType = (questionNo, optionType) => {
    if (id) {
      toast.error("Can't change option type");
    } else {
      dispatch(resetOptions({ questionNo, optionType }));
      dispatch(updateQuestion({ questionNo, optionType }));
    }
  };

  const handleOptionChange = (e, questionNo, optionIndex, optionType) => {
    const { value } = e.target;

    dispatch(
      updateQuestion({
        optionType,
        questionNo,
        optionIndex,
        option: value,
      })
    );
  };

  const handleTextImageChange = (
    e,
    questionNo,
    optionIndex,
    optionType,
    fieldType
  ) => {
    const { value } = e.target;
    dispatch(
      updateQuestion({
        fieldType,
        optionType,
        questionNo,
        optionIndex,
        option: value,
      })
    );
  };

  const addOption = (questionNo, optionType) => {
    if (id) {
      return;
    }
    dispatch(
      addOptions({
        questionNo,
        optionType,
      })
    );
  };

  const removeOption = (index, questionNo, optionType) => {
    dispatch(
      removeOptions({
        index,
        questionNo,
        optionType,
      })
    );
  };

  //if refreash happens it will go the dashboard
  useEffect(() => {
    if (isCreating) {
      return;
    }
    if (id) {
      return;
    }
    if (!quizName || !quizType) {
      navigate("/main/quiz");
    }
  }, [quizName, quizType, navigate]);

  const handleCancel = () => {
    dispatch(resetQuizData());
    dispatch(resetQuizQuestions());
    if (id) {
      navigate("/main/analytics");
    } else {
      navigate("/main/dashboard");
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);

    const qstnError = useValidatePollQuiz(
      quizQuestions[quizQuestions.length - 1]
    );

    if (Object.keys(qstnError).length !== 0) {
      setError((prevError) => ({
        ...prevError,
        [quizQuestions[quizQuestions.length - 1].questionNo]: qstnError,
      }));
      setIsCreating(false);
      return;
    } else {
      setError((prevError) => ({
        ...prevError,
        [quizQuestions[quizQuestions.length - 1].questionNo]: {},
      }));

      try {
        if (id) {
          await updateOldQuiz();
        } else {
          setIsCreating(true);

          await createNewQuiz();
        }
      } catch (error) {
        toast.error("Please try again also check every fields are filled");
      } finally {
        setIsCreating(false);
      }
    }
  };

  const createNewQuiz = async () => {
    setIsCreating(true);

    try {
      const response = await createQuiz(quizName, quizType, quizQuestions);

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        const newShareId = response?.data?.data._id;
        navigate("/main/dashboard");
        dispatch(resetQuizData());
        dispatch(resetQuizQuestions());
        dispatch(setQuizType("poll"));
        setIsCreating(true);
        navigate(`/main/share/${newShareId}`);
      } else {
        toast.error(
          response?.data?.message ||
            "Form creation failed. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during form creation. Please try again later."
      );
    }
  };

  const updateOldQuiz = async () => {
    try {
      const response = await updateQuiz(id, quizQuestions);

      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        dispatch(resetQuizData());
        dispatch(resetQuizQuestions());
        navigate(`/main/share/${id}`);
      } else {
        toast.error(
          response?.data?.message ||
            "Form updation failed. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during form creation. Please try again later."
      );
    }
  };

  const getOldQuiz = async () => {
    try {
      const response = await getOneQuiz(quizId);

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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.mainModal}>
        <div className={styles.top}>
          <div className={styles.qstnNumbers}>
            {quizQuestions.map((question, index) => {
              const { questionNo } = question;
              return (
                <div
                  className={
                    selectedQuestion === questionNo
                      ? styles.selectedNumbers
                      : styles.numbers
                  }
                  key={questionNo}
                  onClick={() => handleQuestionSelect(questionNo)}
                >
                  {questionNo}
                  {!id && questionNo !== 1 && (
                    <img
                      src={Cross}
                      alt="remove question"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveQuestion(index);
                      }}
                    />
                  )}
                </div>
              );
            })}
            {!id && quizQuestions.length < 5 && (
              <div
                className={styles.plusIcon}
                onClick={() => handleAddQuestion(selectedQuestion)}
              >
                <img src={Plus} alt="add quiz" />
              </div>
            )}
          </div>
          <p>Max 5 questions</p>
        </div>
        {selectedQuestionData && (
          <>
            <input
              type="text"
              placeholder="Poll Question"
              autoFocus={true}
              value={selectedQuestionData ? selectedQuestionData?.question : ""}
              onChange={(e) => handleQuestionName(e, selectedQuestion)}
            />

            {error !== null && error[selectedQuestion]?.question && (
              <p className={styles.errorText} style={{ marginTop: "-20px" }}>
                {error[selectedQuestion]?.question}
              </p>
            )}
            <div className={styles.optionType}>
              <p>Option Type </p>
              <div className={styles.options}>
                <input
                  type="radio"
                  name="option"
                  id="text"
                  checked={selectedQuestionData?.optionType === "text"}
                  onChange={() => handleOptionType(selectedQuestion, "text")}
                />
                <label htmlFor="text">Text</label>
              </div>
              <div className={styles.options}>
                <input
                  type="radio"
                  name="option"
                  id="image"
                  checked={selectedQuestionData?.optionType === "image"}
                  onChange={() => handleOptionType(selectedQuestion, "image")}
                />
                <label htmlFor="image">Image URL</label>
              </div>
              <div className={styles.options}>
                <input
                  type="radio"
                  name="option"
                  id="textNimage"
                  checked={selectedQuestionData?.optionType === "textNimage"}
                  onChange={() =>
                    handleOptionType(selectedQuestion, "textNimage")
                  }
                />
                <label htmlFor="textNimage">Text & Image URL</label>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.answerOptions}>
                {selectedQuestionData?.options?.text.map((option, index) => (
                  <div className={styles.answerOption} key={index}>
                    <input
                      className={
                        selectedQuestionData?.optionType === "textNimage"
                          ? selectedQuestionData?.correctAnswer - 1 === index
                            ? styles.selectedTextImageInput
                            : styles.textImageInput
                          : selectedQuestionData?.correctAnswer - 1 === index
                          ? styles.selectedTextInput
                          : styles.textInput
                      }
                      type="text"
                      placeholder={
                        selectedQuestionData?.optionType === "text"
                          ? "Text"
                          : selectedQuestionData?.optionType === "image"
                          ? "Image"
                          : "Text"
                      }
                      value={
                        selectedQuestionData?.optionType !== "textNimage"
                          ? selectedQuestionData?.optionType === "text"
                            ? selectedQuestionData?.options?.text[index] || ""
                            : selectedQuestionData?.options?.image[index] || ""
                          : selectedQuestionData?.options?.text[index]
                      }
                      onChange={
                        selectedQuestionData?.optionType !== "textNimage"
                          ? (e) =>
                              handleOptionChange(
                                e,
                                selectedQuestionData?.questionNo,
                                index,
                                selectedQuestionData?.optionType === "text"
                                  ? "text"
                                  : "image"
                              )
                          : (e) =>
                              handleTextImageChange(
                                e,
                                selectedQuestionData?.questionNo,
                                index,
                                "textNimage",
                                "text"
                              )
                      }
                    />

                    {selectedQuestionData?.optionType === "textNimage" && (
                      <input
                        className={
                          selectedQuestionData?.correctAnswer - 1 === index
                            ? styles.selectedImageInput
                            : styles.imageInput
                        }
                        type="text"
                        placeholder="Image URL"
                        value={
                          selectedQuestionData?.options?.image[index] || ""
                        }
                        onChange={(e) =>
                          handleTextImageChange(
                            e,
                            selectedQuestionData?.questionNo,
                            index,
                            "textNimage",
                            "image"
                          )
                        }
                      />
                    )}
                    {!id && index >= 2 && (
                      <img
                        src={Delete}
                        alt="remove option"
                        onClick={() =>
                          removeOption(
                            index,
                            selectedQuestionData?.questionNo,
                            selectedQuestionData?.optionType
                          )
                        }
                      />
                    )}
                  </div>
                ))}
                {error !== null && error[selectedQuestion]?.textOptions && (
                  <p className={styles.errorText}>
                    {error[selectedQuestion]?.textOptions}
                  </p>
                )}
                {error !== null && error[selectedQuestion]?.imageOptions && (
                  <p className={styles.errorText}>
                    {error[selectedQuestion]?.imageOptions}
                  </p>
                )}

                {error !== null && error[selectedQuestion]?.options && (
                  <p className={styles.errorText}>
                    {error[selectedQuestion]?.options}
                  </p>
                )}
                {!id && selectedQuestionData?.options?.text?.length < 4 && (
                  <div
                    className={styles.addOption}
                    onClick={() =>
                      addOption(
                        selectedQuestionData?.questionNo,
                        selectedQuestionData?.optionType
                      )
                    }
                  >
                    Add option
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className={styles.createBtns}>
          <button className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
          {isCreating && <div className={styles.loadingRing}></div>}
          <button
            className={styles.create}
            onClick={handleCreate}
            disabled={isCreating}
          >
            {id ? "Update Quiz" : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollQuiz;
