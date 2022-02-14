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
const initialSearchSuggestions = require('../../models/data/searchSuggestions.json');

const Search = ({ t }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(initialSearchSuggestions);
  const [isSelected, setIsSelected] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleLoadSuggestions = ({ value, reason }) => {
    if (!isSelected && value?.length >= MIN_SEARCH_TEXT_LENGTH) {
      setSearchTerm(value.toLowerCase());
    }
  };

  const handleClearSuggestions = () => {
    setSuggestions(initialSearchSuggestions);
  };

  const handleSelectSuggestion = (event, { suggestion, suggestionValue }) => {
    setIsSelected(true);
    const routeQuery = suggestion?.slug ? { id: suggestionValue } : { searchTerm: suggestionValue };
    routePokemon(routeQuery).then((success) => {
      if (success) {
        setSearchTerm('');
      }
    });
  };

  const handleChange = (event, { newValue }) => {
    setSearchTerm(newValue?.toLowerCase());
    setIsSelected(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (searchTerm?.length >= MIN_SEARCH_TEXT_LENGTH) {
      routePokemon({ searchTerm }).then((success) => {
        if (success) {
          setSearchTerm('');
        }
      });
    }
  };

  useEffect(() => {
    const searchSuggestions = initialSearchSuggestions.map((suggestionSection) => ({
      ...suggestionSection,
      suggestions: debouncedSearchTerm
        ? suggestionSection.suggestions.filter((suggestion) => suggestion.id.includes(debouncedSearchTerm))
        : suggestionSection.suggestions
    }));
    if (!isSelected && debouncedSearchTerm?.length >= MIN_SEARCH_TEXT_LENGTH) {
      fetchPokemon({ searchTerm: debouncedSearchTerm, type: 'thumbnail' }).then((pokemons) => {
        setSuggestions([
          ...searchSuggestions,
          {
            title: 'Pokemons',
            suggestions: pokemons
          }
        ]);
      });
    } else {
      setSuggestions(searchSuggestions);
    }
  }, [debouncedSearchTerm]);

  return (
    <Container className="pokedex-search">
      <Form className="w-100" noValidate onSubmit={handleSubmit}>
        <InputGroup className="flex-nowrap">
          <AutoSuggest
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsClearRequested={handleClearSuggestions}
            onSuggestionsFetchRequested={handleLoadSuggestions}
            onSuggestionSelected={handleSelectSuggestion}
            getSectionSuggestions={(section) => section.suggestions}
            getSuggestionValue={(suggestion) => suggestion.name?.toLowerCase()}
            renderSectionTitle={SuggestionSectionTitle}
            renderSuggestion={Suggestion}
            shouldRenderSuggestions={(value) => value?.trim().length > 0}
            inputProps={{
              placeholder: t('search-placeholder'),
              value: searchTerm,
              onChange: handleChange
            }}
            theme={{
              container: 'w-100 autosuggest',
              input: 'w-100 form-control',
              suggestionsContainer: 'dropdown',
              suggestion: 'dropdown-item',
              suggestionHighlighted: 'active',
              containerOpen: 'react-autosuggest__container--open',
              suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
              suggestionsList: 'react-autosuggest__suggestions-list',
              suggestionFirst: 'react-autosuggest__suggestion--first',
              sectionContainer: 'react-autosuggest__section-container',
              sectionContainerFirst: 'react-autosuggest__section-container--first',
              sectionTitle: 'react-autosuggest__section-title'
            }}
            highlightFirstSuggestion
          />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              {t('search-submit-button')}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  );
};

Search.propTypes = {
  t: PropTypes.func.isRequired
};

const Suggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.name, query);
  const parts = AutosuggestHighlightParse(suggestion.name, matches);
  return (
    <span>
      {suggestion.image ? (
        <img
          alt={suggestion.slug}
          src={suggestion.image}
          style={{
            height: '24px',
            marginRight: '10px',
            width: '24px'
          }}
        />
      ) : (
        <span className={`background-color-${suggestion.id} badge badge-pill mr-2`}>{suggestion.id}</span>
      )}
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

const SuggestionSectionTitle = (section) => {
  return <strong>{section.title}</strong>;
};

export default withTranslation('common')(Search);
