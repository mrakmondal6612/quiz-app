import React from "react";

export default function Question({ question, onAnswer }) {
  return (
    <div>
      <p>{question.description}</p>
      {/* Render options if they exist */}
      {console.log(question.options)}
      {question.options &&
        question.options.map((option) => (
          <div key={option.id}>
            <button onClick={() => onAnswer(option)}>
              {option.description}
            </button>
          </div>
        ))}
    </div>
  );
}
