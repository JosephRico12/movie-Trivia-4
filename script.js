import React, { useState } from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";

// Trivia data with choices as strings and a correct answer
let trivia1 = {
  picture: "https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/images/methode/2017/12/18/9f79b8f4-e39e-11e7-8ff5-d91dc767c75e_1280x720_123332.jpg?itok=pJuPjUGr", 
  question:" What is the name of the main characters on the titanic?",
  choices: ["Roze and Jack", "Juliet and romeo", "Rose and Jack", "Pericalla and Jack"],
  answer: "Rose and Jack",
};

let trivia2 = {
  question: "How many infinity stones are there?",
  choices: ["7", "4", "5", "6"],
  answer: "6",
};

let trivia3 = {
  question: "How many original avengers are there?",
  choices: ["13", "9", "6", "27"],
  answer: "6",
};

let trivia4 = {
  question: "What won movie of the year in 2014?",
  choices: ["Interstellar", "12 years a slave", "Nightcralwer", "The judge"],
  answer: "12 years a slave",
};

let trivia5 = {
  question: "What year did suicide squad come out?",
  choices: ["2016", "2015", "2018", "2017"],
  answer: "2016",
};

let index = [trivia1, trivia2, trivia3, trivia4, trivia5];

// Displays a clickable button for each answer
function AnswerChoice({ answer, onClick }) {
  return (
    <button className="answerChoice" onClick={() => onClick(answer)}>
      {answer}
    </button>
  );
}

// Renders the question and answer buttons
function Question({ question, choices, onAnswerClick }) {
  return (
    <div className="Question">
      <h2>{question}</h2>
      {choices.map((choice, index) => (
        <AnswerChoice key={index} answer={choice} onClick={onAnswerClick} />
      ))}
    </div>
  );
}

// Navigation to the next question
function NextQuestion({ onNext, questionNum }) {
  return (
    <div className="Next">
      <button onClick={onNext}>Next Question</button>
      <p>Question #{questionNum + 1}</p>
    </div>
  );
}

// Main app logic
function App() {
  const [questionNum, setquestionNum] = useState(0);
  const [answerDisplayed, setanswerDisplayed] = useState(null);

  const currentQuestion = index[questionNum];

  function getCorrectAnswer(num) {
    return index[num].answer;
  }

  function checkAnswerState() {
    const correct = getCorrectAnswer(questionNum);

    if (answerDisplayed === null) {
      return "Click an answer above.";
    } else if (answerDisplayed === correct) {
      return `Correct!`;
    } else {
      return `Incorrect.`;
    }
  }

  function goToNextQuestion() {
    setquestionNum((prev) => prev + 1);
    setanswerDisplayed(null);
  }

  function handleAnswerClick(choice) {
    setanswerDisplayed(choice);
  }

  return (
    <div className="app">
      <h1 className="title"> Movie Triva </h1>

      <Question
        question={currentQuestion.question}
        choices={currentQuestion.choices}
        onAnswerClick={handleAnswerClick}
      />

      <NextQuestion onNext={goToNextQuestion} questionNum={questionNum} />

      <p>{checkAnswerState()}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
