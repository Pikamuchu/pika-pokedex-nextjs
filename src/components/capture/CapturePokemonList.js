/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { withTranslation } from '../../i18n';
import PokemonList from '../pokemon/PokemonList';
import usePokemon from '../../hooks/usePokemon';
import useCapture from '../../hooks/useCapture';
import { arrayPage } from '../../libs/utils';

const CAPTURE_PAGE_SIZE = 20;

const CapturePokemonList = ({ t }) => {
  const initialPageIndex = 1;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { data: ids } = useCapture();
  const { data: pokemons } = usePokemon({ ids });

  let showMoreButton = pokemons?.length;
  const morePokemonList = [];
  for (let i = initialPageIndex + 1; i < pageIndex; i++) {
    const morePokemons = arrayPage(pokemons, CAPTURE_PAGE_SIZE, i);
    showMoreButton = morePokemons?.length;
    morePokemonList.push(<PokemonList pokemons={morePokemons} showNotFound={false} />);
  }

  return (
    <>
      <PokemonList pokemons={arrayPage(pokemons, CAPTURE_PAGE_SIZE, initialPageIndex)} showNotFound={false} />
      {morePokemonList}
      {showMoreButton ? (
        <Row className="justify-content-center invisible">
          <Button onClick={() => setPageIndex(pageIndex + 1)}>Show More</Button>
        </Row>
      ) : (
        ''
      )}
    </>
  );
};

CapturePokemonList.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('capture')(CapturePokemonList);
