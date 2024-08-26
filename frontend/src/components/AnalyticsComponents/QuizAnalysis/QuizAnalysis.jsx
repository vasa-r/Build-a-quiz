import React, { useEffect, useState } from "react";
import styles from "./QuizAnalysis.module.css";
import Edit from "../../../assets/edit-quiz.svg";
import Delete from "../../../assets/delete.svg";
import Share from "../../../assets/share-quiz.svg";
import { getAllQuiz } from "../../../api/quiz";
import { Link, useNavigate } from "react-router-dom";
import DeleteQuizModal from "../DeleteQuizModal/DeleteQuizModal";
import { toast } from "react-toastify";
import AnalysisShimmer from "../../LoadinComponents/AnalysisShimmer/AnalysisShimmer";

const QuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteId === null) {
      getQuizzes();
    }
  }, [deleteId]);

  const getQuizzes = async () => {
    try {
      const response = await getAllQuiz();
      if (response.success || response.status === 200) {
        const { data } = response.data;
        setQuizzes(data);
        setIsLoading(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't fetch quiz. Please try again later"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred during fetching quiz. Please try again later."
      );
    }
  };

  const handleEdit = (id) => {
    navigate(`/main/quiz/questions/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleShare = async (id) => {
    if (!id) return;

    const link = `${window.location.origin}/live/${id}`;

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to Clipboard");
    } catch (error) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  if (isLoading) return <AnalysisShimmer />;

  return (
    <>
      {showDelete && (
        <DeleteQuizModal
          id={deleteId}
          modalSetter={setShowDelete}
          isOpen={showDelete}
          setDeleteId={setDeleteId}
        />
      )}
      <div
        className={
          quizzes.length > 0 ? styles.analysWrapper : styles.noQuizWrapper
        }
      >
        <h1>Quiz Analysis</h1>
        {quizzes.length === 0 ? (
          <div className={styles.noQuiz}>
            <h1 className={styles.noData}>
              No Quizzes available yet. Start creating...
            </h1>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr
                  key={quiz._id}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td>{index + 1}</td>
                  <td>{quiz.quizName}</td>
                  <td>{quiz.createdTime}</td>
                  <td>{quiz.impressions}</td>
                  <td className={styles.actions}>
                    <img
                      src={Edit}
                      alt="edit quiz"
                      onClick={() => handleEdit(quiz._id)}
                    />
                    <img
                      src={Delete}
                      alt="delete quiz"
                      onClick={() => handleDelete(quiz._id)}
                    />
                    <img
                      src={Share}
                      alt="share quiz"
                      onClick={() => handleShare(quiz._id)}
                    />
                  </td>
                  <td className={styles.linkData}>
                    <Link
                      to={`/main/analytics/questions/${quiz._id}`}
                      className={styles.link}
                    >
                      Question Wise Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default QuizAnalysis;
