import React, { useEffect, useState } from "react";
import QuizeStart from "./components/QuizeStart";
import Result from "./components/Result";
import Question from "./components/Question";
import axios from "axios";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetching quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          "https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX"
        );
        setQuizData(JSON.parse(response.data.contents)); // Parsing the JSON response from AllOrigins
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  // Start Quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setScore(0); // Reset score when starting a new quiz
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  // Answering Question
  const answerQuestion = (selectedOption) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    // Check if the selected option is correct
    if (currentQuestion.correct_answer === selectedOption.id) {
      setScore((prevScore) => prevScore + 1); // Increase score using the previous score value
    }

    // Move to the next question or finish the quiz
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true); // End the quiz
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setQuizStarted(false); // Go back to the start screen
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {!quizStarted ? (
        <QuizeStart startQuiz={startQuiz} />
      ) : quizCompleted ? (
        <Result
          score={score}
          totalQuestions={quizData.questions.length}
          restartQuiz={restartQuiz}
        />
      ) : (
        <Question
          question={quizData.questions[currentQuestionIndex]}
          onAnswer={answerQuestion}
        />
      )}
    </div>
  );
}

export default App;
