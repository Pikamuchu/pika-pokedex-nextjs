import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonTile from './PokemonTile';
import NotFound from '../layout/NotFound';

const CaptureModal = ({ t, pokemon, showCaptureModal }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button onClick={() => setSmShow(true)}>Small modal</Button>
      {' '}
      <Button onClick={() => setModalShow(true)}>Large modal</Button>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Large Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  );
};

PokemonTile.propTypes = {
  pokemon: PropTypes.shape({
    code: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default withTranslation('pokemon')(PokemonTile);
