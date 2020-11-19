import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Personnage from './Personnage';
import Choice from './Choice';

const Home = () => {
  const [persos, setPersos] = useState([]);
  const [choice, setChoice] = useState(false);

  useEffect(() => {
    handleAxios();
  }, []);

  const handleAxios = () => {
    axios
      .get('http://localhost:3001/api/history')
      .then((response) => response.data)
      .then((data) => setPersos(data));
  };

  const handleChoice = () => {
    setChoice(!choice);
  };

  return (
    <div className="container">
      <div className="row">
        {persos.map((perso) => (
          <Personnage
            key={perso.id}
            perso={perso}
            handleChoice={handleChoice}
          />
        ))}
      </div>

      {choice && <Choice />}
    </div>
  );
};

export default Home;
