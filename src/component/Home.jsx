import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Personnage from './Personnage';
import Choice from './Choice';
import { Link } from 'react-router-dom';
import '../styles/css/components/Home.css';

const Home = () => {
  const [persos, setPersos] = useState([]); // stockes les personnages
  const [choice, setChoice] = useState(false); // vérifier si l'utilisateur à cliqué sur le personne (true)
  const [currentPersoId, setCurrentPerso] = useState({});

  useEffect(() => {
    handleAxiosPersos();
  }, []);

  const handleAxiosPersos = () => {
    axios
      .get('http://localhost:3001/api/history')
      .then((response) => response.data)
      .then((data) => setPersos(data));
  };

  // const handleAxiosProblem = () => {
  //   axios
  //     .get('http://localhost:3001/api/problems')
  //     .then((response) => response.data)
  //     .then((data) => data.filter()
  //     setPersos(data));
  // };

  const handleChoice = (e) => {
    setChoice(!choice);
    setCurrentPerso(e.target.parentNode.parentNode.id.slice(-1));
  };

  return (
    <div className="Home">
      <div className="container">
        <h1>Choose your story.</h1>
        <div className="row">
          {persos.map((perso) => (
            <div className="link-block col-md-4">
              <Link to={`/history/${perso.id}/choice/${perso.id}/`}>
                <Personnage
                  key={perso.id}
                  perso={perso}
                  handleChoice={handleChoice}
                />
              </Link>
            </div>
          ))}
        </div>

        {choice && <Choice /*personnageId={currentPersoId}*/ />}
      </div>
    </div>
  );
};

export default Home;
