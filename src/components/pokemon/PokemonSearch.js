import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import AutoSuggest from 'react-autosuggest';
import { Router, withTranslation } from '../../i18n';
import { fetchPokemon } from '../../hooks/usePokemon';

const debounce = require('lodash/debounce');

const MIN_SEARCH_TEXT_LENGTH = 3;

const PokemonSearch = ({ t }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleLoadSuggestions = ({ value, reason }) => {
    if (reason === 'input-changed' && value?.length >= MIN_SEARCH_TEXT_LENGTH) {
      setIsLoading(true);
      fetchPokemon({ search: value, type: 'thumbnail' }).then((pokemons) => {
        setSuggestions(pokemons);
        setIsLoading(false);
      });
    }
  };

  const handleLoadSuggestionsDebounced = debounce(handleLoadSuggestions, 1000);

  const handleClearSuggestions = () => {
    setSuggestions([]);
    setIsSelected(false);
  };

  const handleSelectSuggestion = (event, { suggestionValue }) => {
    setSearchText(suggestionValue);
    setIsSelected(true);
  };

  const handleChange = (event, { newValue }) => {
    setSearchText(newValue);
    setIsSelected(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() && searchText?.length >= MIN_SEARCH_TEXT_LENGTH) {
      setValidated(true);
      //      if (isSelected) {
      Router?.push(`/pokemon?q=${searchText}`).then(() => window.scrollTo(0, 0));
      //      } else {
      //        Router?.push(`/pokemon/${searchText}`).then(() => window.scrollTo(0, 0));
      //      }
    } else {
      setValidated(false);
    }
  };

  return (
    <Container className="pokemon-search">
      <Form className="w-100" noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup className="flex-nowrap">
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={handleClearSuggestions}
            onSuggestionsFetchRequested={handleLoadSuggestionsDebounced}
            onSuggestionSelected={handleSelectSuggestion}
            getSuggestionValue={(suggestion) => suggestion.name}
            shouldRenderSuggestions={(value) => value?.trim().length >= MIN_SEARCH_TEXT_LENGTH}
            renderSuggestion={Suggestion}
            inputProps={{
              placeholder: t('search-placeholder'),
              value: searchText,
              onChange: handleChange,
            }}
            theme={{
              container: 'w-100 autosuggest',
              input: 'w-100 form-control',
              suggestionsContainer: 'dropdown',
              suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
              suggestion: 'dropdown-item',
              suggestionHighlighted: 'active',
            }}
            highlightFirstSuggestion
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" type="submit">
              {t('search-submit-button')}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  );
};

PokemonSearch.propTypes = {
  t: PropTypes.func.isRequired,
};

const Suggestion = (suggestion) => {
  return (
    <span>
      <img
        alt={suggestion.slug}
        src={suggestion.image}
        style={{
          height: '24px',
          marginRight: '10px',
          width: '24px',
        }}
      />
      <span>{suggestion.slug}</span>
    </span>
  );
};

export default withTranslation('common')(PokemonSearch);
