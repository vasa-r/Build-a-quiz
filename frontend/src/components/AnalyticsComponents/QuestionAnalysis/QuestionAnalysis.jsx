import React, { useState, useEffect } from "react";
import styles from "./QuestionAnalysis.module.css";
import SingleQuestion from "../SingleQuestion/SingleQuestion";
import { useParams } from "react-router-dom";
import { getOneQuiz } from "../../../api/quiz";
import QuestionAnalysShimmer from "../../LoadinComponents/QuestionAnalysShimmer/QuestionAnalysShimmer";
import { toast } from "react-toastify";

const QuestionAnalysis = () => {
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getOldQuiz();
  }, []);

  const getOldQuiz = async () => {
    try {
      const response = await getOneQuiz(id);
      if (response.success || response.status === 200) {
        const { data } = response.data;
        setQuiz(data);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't fetch quiz. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during fetching quiz. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { quizName, quizType, createdTime, impressions, quizQuestions } =
    quiz || {};

  if (isLoading) return <QuestionAnalysShimmer />;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.qstnData}>
        <h1 className={styles.title}>{quizName} Question Analysis</h1>
        <div className={styles.metaData}>
          <p>Created on : {createdTime}</p>
          <p>Impressions : {impressions}</p>
        </div>
      </div>
      {quizQuestions?.map((q) => {
        const { questionNo, analytics, question } = q;
        return (
          <SingleQuestion
            key={questionNo}
            questionNo={questionNo}
            question={question}
            analytics={analytics}
            quizType={quizType}
          />
        );
      })}
    </div>
  );
};

export default QuestionAnalysis;
