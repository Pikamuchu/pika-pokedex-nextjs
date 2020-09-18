import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Container, InputGroup, Form, Button } from 'react-bootstrap';
import AutoSuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { withTranslation } from '../../i18n';
import useDebounce from '../../hooks/useDebounce';
import { fetchPokemon, routePokemon } from '../../hooks/usePokemon';

const MIN_SEARCH_TEXT_LENGTH = 3;

const Search = ({ t }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleLoadSuggestions = ({ value, reason }) => {
    if (reason === 'input-changed' && value?.length >= MIN_SEARCH_TEXT_LENGTH) {
      setSearchTerm(value);
      setIsSelected(false);
    }
  };

  const handleClearSuggestions = () => {
    setSuggestions([]);
  };

  const handleSelectSuggestion = (event, { suggestionValue }) => {
    setIsSelected(true);
    routePokemon({ slug: suggestionValue });
  };

  const handleChange = (event, { newValue }) => {
    setSearchTerm(newValue);
    setIsSelected(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (searchTerm?.length >= MIN_SEARCH_TEXT_LENGTH) {
      routePokemon(isSelected ? { slug: searchTerm } : { searchTerm });
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm?.length >= MIN_SEARCH_TEXT_LENGTH) {
      setIsSearching(true);
      fetchPokemon({ searchTerm: debouncedSearchTerm, type: 'thumbnail' }).then((pokemons) => {
        setIsSearching(false);
        setSuggestions(pokemons);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <Container className="pokedex-search">
      <Form className="w-100" noValidate onSubmit={handleSubmit}>
        <InputGroup className="flex-nowrap">
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsClearRequested={handleClearSuggestions}
            onSuggestionsFetchRequested={handleLoadSuggestions}
            onSuggestionSelected={handleSelectSuggestion}
            getSuggestionValue={(suggestion) => suggestion.name}
            shouldRenderSuggestions={(value) => value?.trim().length >= MIN_SEARCH_TEXT_LENGTH}
            renderSuggestion={Suggestion}
            inputProps={{
              placeholder: t('search-placeholder'),
              value: searchTerm,
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

Search.propTypes = {
  t: PropTypes.func.isRequired,
};

const Suggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.name, query);
  const parts = AutosuggestHighlightParse(suggestion.name, matches);
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
      <span>
        {parts.map((part, index) => {
          const key = part.text + index;
          const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
          return (
            <span className={className} key={key}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default withTranslation('common')(Search);
