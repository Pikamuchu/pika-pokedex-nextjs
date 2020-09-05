const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex({
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
});

const DEFAULT_LIMIT = 20;
const DEFAULT_LANG = 'en';

export const getListItems = async (params) => {
  const limit = (params && params.limit) || DEFAULT_LIMIT;
  const offset = (params && params.offset) || 0;
  const lang = (params && params.lang) || DEFAULT_LANG;
  const itemList = await P.getPokemonsList({ limit, offset });
  const pokemonList = await Promise.all(
    itemList.results.map(async (item) => {
      return getItem(item.name, lang);
    })
  );
  return pokemonList.filter((pokemon) => !pokemon.evolvesFromId);
};

export const getListFilters = async (params) => {
  return {};
};

export const getDetails = async (id, lang) => {
  const [pokemon, species] = await Promise.all([P.getPokemonByName(id), P.getPokemonSpeciesByName(id)]);
  return (
    pokemon && {
      id: pokemon.name,
      code: formatCode(pokemon.id),
      name: translateName(species.names, lang),
      types: mapTypes(pokemon.types),
      color: pokemon.color,
      evolvesFromId: species.evolves_from_species && species.evolves_from_species.name,
      abilities: pokemon.abilities && pokemon.abilities.map((item) => item.ability.name),
      weight: pokemon.weight,
      height: pokemon.height,
      stats: mapStats(pokemon.stats),
      category: '',
      description: '',
    }
  );
};

export const getItem = async (id, lang) => {
  const pokemon = await P.getPokemonByName(id);
  return {
    id,
    code: formatCode(pokemon.id),
    name: pokemon.name,
    types: mapTypes(pokemon.types),
  };
};

const formatCode = (code) => code && code.toString().padStart(3, '0');

const translateName = (translations, lang) => {
  const translation = translations && translations.filter((item) => item.language && item.language.name === lang);
  return translation && translation[0] && translation[0].name;
};

const mapTypes = (types) => {
  return (
    types &&
    types.map((item) => {
      return { id: item.type.name, name: item.type.name };
    })
  );
};

const mapStats = (stats) => {
  return (
    stats &&
    stats.map((item) => {
      return { name: item.stat.name, value: item.base_stat };
    })
  );
};
