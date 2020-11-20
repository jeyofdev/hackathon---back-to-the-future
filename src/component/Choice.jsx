import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

const Choice = ({ match }) => {
  const { id } = match.params;
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState({});
  const [resolves, setResolves] = useState([]);
  const [solution, setSolution] = useState('false');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/history/${id}/problems`)
      .then((response) => response.data)
      .then((data) => {
        setProblems(data);
        if (data[0]) {
          setCurrentProblem(data[0]);
        }

        axios
          .get(`http://localhost:3001/api/problems/1/resolves`)
          .then((response2) => response2.data)
          .then((data) => {
            setResolves(data);
          });
      });
  }, []);

  const handleSolution = (solutionIsTrue) => {
    setSolution(solutionIsTrue);
  };

  return (
    <div>
      <p>{currentProblem.description}</p>
      {resolves !== [] &&
        resolves.map((resolve) => (
          <div>
            {/* // <Button>
            //   label={resolve.title}
            //   solutionIsTrue={resolve.solution}
            //   handleSolution={() => handleSolution()}
            // /> */}
            <button onClick={() => handleSolution(resolve.solution)}>
              {resolve.title}
            </button>
            <p>{resolve.all_description}</p>
          </div>
        ))}
    </div>
  );
};

export default Choice;
