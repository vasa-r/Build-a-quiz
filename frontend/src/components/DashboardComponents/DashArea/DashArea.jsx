import React, { useEffect, useState } from "react";
import styles from "./DashArea.module.css";
import TrendQuizCard from "../TrendQuizCard/TrendQuizCard";
import { getAllQuiz } from "../../../api/quiz";
import { formatNumber } from "../../../utils/constants";
import { toast } from "react-toastify";
import DashShimmer from "../../LoadinComponents/DashShimmer/DashShimmer";

const DashArea = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuizzes();
  }, []);

  const totalQuestions = quizzes.reduce((total, quiz) => {
    return total + quiz.quizQuestions.length;
  }, 0);

  const totalImpressions = quizzes.reduce((total, quiz) => {
    return total + quiz.impressions;
  }, 0);

  const getQuizzes = async () => {
    try {
      const response = await getAllQuiz();
      if (response.success || response.status === 200) {
        const { data } = response.data;
        setQuizzes(data);
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

  const trendingQuizzes = quizzes.filter((quiz) => quiz.impressions > 10);

  if (isLoading) {
    return <DashShimmer />;
  }

  return (
    <>
      <div className={styles.dashAreaWrapper}>
        <div className={styles.stats}>
          <div className={`${styles.totalQuiz} ${styles.statsContainer}`}>
            <h1>
              <span>{quizzes.length} </span>Quiz <br /> Created
            </h1>
          </div>
          <div className={`${styles.totalQuestions} ${styles.statsContainer}`}>
            <h1>
              <span>{formatNumber(totalQuestions)} </span>questions <br />{" "}
              Created
            </h1>
          </div>
          <div
            className={`${styles.totalImpressions} ${styles.statsContainer}`}
          >
            <h1>
              <span>{formatNumber(totalImpressions)} </span>Total <br />{" "}
              Impressions
            </h1>
          </div>
        </div>
        <div className={styles.trending}>
          <h1>Trending Quizs</h1>
          <div
            className={
              trendingQuizzes.length > 0 ? styles.trendingQuiz : styles.noQuiz
            }
          >
            {trendingQuizzes.length === 0 ? (
              <div>
                <h1>No Trending Quiz Available yet</h1>
                <p>hint: Quizzes which have impression greater than 10</p>
              </div>
            ) : (
              trendingQuizzes.map((quiz) => {
                const { _id, quizName, createdTime, impressions } = quiz;
                return (
                  <TrendQuizCard
                    key={_id}
                    quizName={quizName}
                    createdTime={createdTime}
                    impressions={impressions}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashArea;
