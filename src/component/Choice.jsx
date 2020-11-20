import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/css/components/Choice.css';

const Choice = ({ match }) => {
  const { idHistory } = match.params;
  const [problem, setProblem] = useState([]);
  const [currentProblem, setCurrentProblem] = useState({});
  const [resolves, setResolves] = useState([]);
  const [solution, setSolution] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/history/${idHistory}/problems`)
      .then((response) => response.data)
      .then((data) => data.filter((problem, index) => index === step)[0])
      .then((data2) =>
        axios
          .get(`http://localhost:3001/api/problems/${data2.id}/resolves`)
          .then((response) => response.data)
          .then((data3) => handleContent(data3, data2))
      );
  }, [step]);

  const handleContent = (data3, data2) => {
    setProblem(data2);
    setResolves(data3);
  };

  const handleSolution = (solutionIsTrue) => {
    setSolution(solutionIsTrue);
  };

  const handleSubmit = (newStep) => {
    setStep(newStep);
    setSolution('false');
  };

  return (
    <div
      style={{ backgroundImage: `url(${problem.background_image})` }}
      className="Choice"
    >
      {problem.title}
      <p>{problem.description}</p>
      <div className="resolve">
        {resolves !== [] &&
          resolves.map((resolve) => (
            <div className="btn-resolve">
              <button onClick={() => handleSolution(resolve.solution)}>
                {resolve.title}
              </button>
              {solution === 'true' && <p>{resolve.all_description}</p>}
            </div>
          ))}
      </div>
      {solution === 'true' && (
        <button onClick={() => handleSubmit(step + 1)}>ok</button>
      )}
    </div>
  );
};

export default Choice;
