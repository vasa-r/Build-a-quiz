# Quiz Application

## Overview

This project is a full-stack web application where users can create, share, and take quizzes. The application supports two types of quizzes: Q&A type and Poll type. The application includes a user dashboard, sharing functionalities, anonymous quiz-taking options, and quiz analytics. The following features provide detailed insight into the application structure.

## Features

1. User Authentication
   - Users must be logged in to create a quiz.
   - Multiple users can create accounts, manage their quizzes, and access their created quizzes in their dashboards.

2. Quiz Creation and Management
   - Two types of quizzes:
     - Poll Quiz: No correct answers; only poll data is collected.
     - Q&A Quiz: Contains correct answers; scores are shown at the end.
   - Users can create quizzes with a maximum of 5 questions.
   - A quiz can either be:
     - Single Question: Contains one question.
     - Group Quiz: Contains multiple questions (up to 5).
   - Each question has associated options, and for Q&A quizzes, one option is marked as the correct answer.
   - A quiz can have a timer set on each question.

3. Quiz Sharing and Access
   - Users can share their quizzes using a share button.
   - Anonymous users can access and take quizzes without needing to log in.

4. Quiz Taking
   - Anonymous users can take quizzes directly via a shared link.
   - For Q&A quizzes, users will see their scores after completing the quiz.
   - For Poll quizzes, results are not displayed after submission.
   - If a user refreshes in the middle of taking a quiz, the quiz restarts, and the impression count increases by 1.

5. Editing Rules
   - Users cannot edit:
     - Quiz name or type.
     - Type of a question or the number of options.
   - Users can:
     - Edit a question and its associated options (without changing the correct answer).
     - Edit the timer for a question.

6. Impressions and Analytics
   - Each time a quiz link is opened, the impression count increases by one.
   - A quiz is marked as trending if its impression count exceeds 10.
   - Analytics are built to track quiz impressions and results.
