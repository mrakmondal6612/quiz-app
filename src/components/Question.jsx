import React from "react";

function Question({ question, onAnswer }) {
  const { description, options } = question;
  console.log(options);
  return (
    <div className="question">
      <h3>{description}</h3>
      <div className="options">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.is_correct)} // Pass option id when clicked
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
