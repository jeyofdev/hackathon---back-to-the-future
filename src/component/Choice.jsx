import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/css/components/Choice.css';

const Choice = ({ match, personnage }) => {
  const { id, idChoice } = match.params;
  const [problem, setProblem] = useState([]);
  const [currentProblem, setCurrentProblem] = useState({});
  const [resolves, setResolves] = useState([]);
  const [solution, setSolution] = useState('false');
  const [step, setStep] = useState(0);
  const [idResolve, setIdResolve] = useState(null);
  const [currentPerso, setCurrentPerso] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/history/${id}`)
      .then((response) => response.data)
      .then((data) =>
        setCurrentPerso(data.filter((perso) => perso.id === Number(id))[0])
      );

    axios
      .get(`http://localhost:3001/api/history/${id}/problems`)
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

  const handleSolution = (solutionIsTrue, idResolve) => {
    setSolution(solutionIsTrue);
    setIdResolve(idResolve);
  };

  const handleSubmit = (newStep) => {
    setStep(newStep);
    setSolution('false');
  };

  return (
    <div className="background">
      <div className="background-opacity"></div>
      <div
        style={{
          backgroundImage: `url(${problem.background_image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="Choice"
      >
        <h1 className="Problem_title">{problem.title}</h1>
        <div>
          {solution === 'false' && (
            <div className="Problem_content">
              <div
                className="personnage"
                style={{
                  backgroundImage: `url(${currentPerso.images})`,
                }}
              ></div>
              <div className="content">
                <p className="Problem_description">{problem.description}</p>
                <div className="resolve">
                  {resolves !== [] &&
                    resolves.map((resolve) => (
                      <ul className="btn-resolve">
                        {solution === 'true' && (
                          <p>{resolve.all_description}</p>
                        )}
                        <button
                          onClick={() =>
                            handleSolution(resolve.solution, resolve.id)
                          }
                        >
                          {resolve.title}
                        </button>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
          )}
          {solution === 'true' && (
            <div>
              {resolves
                .filter((resolve) => resolve.id === idResolve)
                .map((resolve) => (
                  <p className="Problem_Alldescription">
                    {resolve.all_description}
                  </p>
                ))}
              <button onClick={() => handleSubmit(step + 1)}>Continuez</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Choice;
