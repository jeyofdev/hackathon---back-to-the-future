import React from 'react';

const Button = ({ label, solutionIsTrue, handleSolution }) => {
  return (
    <div>
      <button onClick={() => handleSolution(solutionIsTrue)}>{label}</button>
    </div>
  );
};

export default Button;
