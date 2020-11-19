import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Choice = ({ personnageId }) => {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState({});

  useEffect(() => {
    handleAxiosProblems();
  }, []);

  const handleAxiosProblems = () => {
    axios
      .get(`http://localhost:3001/api/history/${personnageId}/problems`)
      .then((response) => response.data)
      .then((data) => {
        setProblems(data);

        if (data[0]) {
          setCurrentProblem(data[0]);
        }
      });
  };

  return (
    <div>
      <p>{currentProblem.description}</p>
    </div>
  );
};

export default Choice;
