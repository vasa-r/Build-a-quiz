import React, { useState } from "react";
import styles from "./PollQuiz.module.css";
import Cross from "../../../assets/cross.svg";
import Plus from "../../../assets/plus.svg";
import Delete from "../../../assets/delete.svg";

const PollQuiz = () => {
  const [optionType, setOptionType] = useState("textNimage");
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.mainModal}>
        <div className={styles.top}>
          <div className={styles.qstnNumbers}>
            <div className={styles.numbers}>1</div>
            <div className={styles.numbers}>
              2 <img src={Cross} alt="remove questiion" />
            </div>
            <div className={styles.numbers}>
              3 <img src={Cross} alt="remove questiion" />
            </div>
            <div className={styles.numbers}>
              4 <img src={Cross} alt="remove questiion" />
            </div>
            <div className={styles.numbers}>
              5 <img src={Cross} alt="remove questiion" />
            </div>
            <div className={styles.plusIcon}>
              <img src={Plus} alt="add quiz" />
            </div>
          </div>
          <p>Max 5 questions</p>
        </div>
        <input type="text" placeholder="Poll Question" />
        <div className={styles.optionType}>
          <p>Option Type </p>
          <div className={styles.options}>
            <input type="radio" name="option" id="text" />
            <label htmlFor="text">Text</label>
          </div>
          <div className={styles.options}>
            <input type="radio" name="option" id="image" />
            <label htmlFor="image">Image URL</label>
          </div>
          <div className={styles.options}>
            <input type="radio" name="option" id="textNimage" />
            <label htmlFor="textNimage">Text & Image URL</label>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.answerOptions}>
            <div className={styles.answerOption}>
              <input
                className={
                  optionType === "textNimage"
                    ? styles.textImageInput
                    : styles.textInput
                }
                type="text"
                placeholder="Text"
              />

              {optionType === "textNimage" && (
                <input
                  className={styles.imageInput}
                  type="text"
                  placeholder="Image URL"
                />
              )}
            </div>
            <div className={styles.answerOption}>
              <input
                className={
                  optionType === "textNimage"
                    ? styles.textImageInput
                    : styles.textInput
                }
                type="text"
                placeholder="Text"
              />
              {optionType === "textNimage" && (
                <input
                  className={styles.imageInput}
                  type="text"
                  placeholder="Image URL"
                />
              )}
            </div>
            <div className={styles.answerOption}>
              <input
                className={
                  optionType === "textNimage"
                    ? styles.textImageInput
                    : styles.textInput
                }
                type="text"
                placeholder="Text"
              />
              {optionType === "textNimage" && (
                <input
                  className={styles.imageInput}
                  type="text"
                  placeholder="Image URL"
                />
              )}
              <img src={Delete} alt="remove option" />
            </div>
            <div className={styles.answerOption}>
              <input
                className={
                  optionType === "textNimage"
                    ? styles.textImageInput
                    : styles.textInput
                }
                type="text"
                placeholder="Text"
              />
              {optionType === "textNimage" && (
                <input
                  className={styles.imageInput}
                  type="text"
                  placeholder="Image URL"
                />
              )}
              <img src={Delete} alt="remove option" />
            </div>
            <div className={styles.addOption}>Add option</div>
          </div>
        </div>
        <div className={styles.createBtns}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.create}>Create Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default PollQuiz;
