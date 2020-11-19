import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Personnage from './Personnage';

const Home = () => {
  const [persos, setPersos] = useState([]);

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
    console.log('ok');
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
    </div>
  );
};

export default Home;
