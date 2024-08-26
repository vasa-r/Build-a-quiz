import React from "react";
import styles from "./DashboardPage.module.css";
import SideBar from "../../components/SideBar/SideBar";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DashShimmer from "../../components/LoadinComponents/DashShimmer/DashShimmer";
import AnalysisShimmer from "../../components/LoadinComponents/AnalysisShimmer/AnalysisShimmer";

//lazy loading implemented for better optimizations
const DashArea = React.lazy(() =>
  import("../../components/DashboardComponents/DashArea/DashArea")
);
const QuizAnalysis = React.lazy(() =>
  import("../../components/AnalyticsComponents/QuizAnalysis/QuizAnalysis")
);
const QuestionAnalysis = React.lazy(() =>
  import(
    "../../components/AnalyticsComponents/QuestionAnalysis/QuestionAnalysis"
  )
);
const CreateQuiz = React.lazy(() =>
  import("../../components/QuizComponents/CreateQuiz/CreateQuiz")
);
const QnaQuiz = React.lazy(() =>
  import("../../components/QuizComponents/QnaQuiz/QnaQuiz")
);
const PollQuiz = React.lazy(() =>
  import("../../components/QuizComponents/PollQuiz/PollQuiz")
);
const QuizPublishedLink = React.lazy(() =>
  import("../../components/QuizComponents/QuizPublishedLink/QuizPublishedLink")
);

const DashboardPage = () => {
  const quizType = useSelector((store) => store.fields.quizType);

  return (
    <>
      <div className={styles.dashWrapper}>
        <div className={styles.sidebarContainer}>
          <SideBar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<DashArea />} />
          <Route path="/analytics" element={<QuizAnalysis />} />
          <Route
            path="/analytics/questions/:id"
            element={<QuestionAnalysis />}
          />
          <Route path="/quiz" element={<CreateQuiz />} />
          <Route
            path="/quiz/questions"
            element={quizType === "poll" ? <PollQuiz /> : <QnaQuiz />}
          />
          <Route
            path="/quiz/questions/:id"
            element={quizType === "poll" ? <PollQuiz /> : <QnaQuiz />}
          />
          <Route path="/share/:id" element={<QuizPublishedLink />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardPage;
