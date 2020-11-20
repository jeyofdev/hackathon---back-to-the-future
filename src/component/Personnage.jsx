import react from 'react';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

const Personnage = ({ perso, handleChoice }) => {
  return (
    <div className="col-md-4" id={`perso-${perso.id}`}>
      <Card onClick={handleChoice}>
        <CardImg
          src={
            perso.images !== null
              ? perso.images
              : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
          }
          alt={perso.title}
        />
        <CardBody>
          <CardTitle tag="h2">{perso.title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default Personnage;
