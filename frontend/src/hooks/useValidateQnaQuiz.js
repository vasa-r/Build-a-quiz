const useValidateQnaQuiz = (quizQuestion) => {
  const errors = {};

  if (!quizQuestion.question || quizQuestion.question.trim() === "") {
    errors.question = "Question is required.";
  }

  if (!quizQuestion.correctAnswer) {
    errors.correctAnswer = "Correct answer must be selected.";
  }

  if (
    quizQuestion.optionType === "text" ||
    quizQuestion.optionType === "image"
  ) {
    if (quizQuestion.optionType === "image") {
      const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
      const base64Pattern = /^data:image\/(png|jpg|jpeg|gif);base64,/;

      if (
        quizQuestion.options.image.some(
          (option) =>
            !option ||
            option.trim() === "" ||
            (!urlPattern.test(option) && !base64Pattern.test(option))
        )
      ) {
        errors.options =
          "All image options must be valid URLs and not to be empty.";
      }
    } else {
      if (
        quizQuestion.options[quizQuestion.optionType].some(
          (option) => !option || option.trim() === ""
        )
      ) {
        errors.options = "Options shouldn't be empty.";
      }
    }
  } else if (quizQuestion.optionType === "textNimage") {
    const { text, image } = quizQuestion.options;
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    const base64Pattern = /^data:image\/(png|jpg|jpeg|gif);base64,/;

    if (text.some((option) => !option || option.trim() === "")) {
      errors.textOptions = "All text options are required.";
    }
    if (
      image.some(
        (option) =>
          !option ||
          option.trim() === "" ||
          (!urlPattern.test(option) && !base64Pattern.test(option))
      )
    ) {
      errors.imageOptions =
        "All image options must be valid URLs and not to be empty.";
    }
  }

  return errors;
};

export default useValidateQnaQuiz;
