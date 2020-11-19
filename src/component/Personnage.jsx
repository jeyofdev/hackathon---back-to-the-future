import { Card, CardBody, CardTitle } from 'reactstrap';

const Personnage = ({ perso, handleChoice }) => {
  return (
    <div>
      <Card onClick={handleChoice}>
        {/* <CardImg top width="100%" src="" alt={`card perso.title`} /> */}
        <CardBody>
          <CardTitle tag="h2">{perso.title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default Personnage;
