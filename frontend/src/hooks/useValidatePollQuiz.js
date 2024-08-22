const validatePollQuiz = (quizQuestion) => {
  const errors = {};

  if (!quizQuestion.question || quizQuestion.question.trim() === "") {
    errors.question = "Question is required.";
  }

  if (
    quizQuestion.optionType === "text" ||
    quizQuestion.optionType === "image"
  ) {
    if (
      quizQuestion.options[quizQuestion.optionType].some(
        (option) => !option || option.trim() === ""
      )
    ) {
      errors.options = "Options shouldn't be empty";
    }
  } else if (quizQuestion.optionType === "textNimage") {
    const { text, image } = quizQuestion.options;
    if (text.some((option) => !option || option.trim() === "")) {
      errors.textOptions = "All text options are required";
    }
    if (image.some((option) => !option || option.trim() === "")) {
      errors.textOptions = "All image options are required";
    }
  }
  return errors;
};

export default validatePollQuiz;
