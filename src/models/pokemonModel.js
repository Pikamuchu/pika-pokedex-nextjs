import preferences from '../preferences';

const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex({
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
});

const SEARCH_LIMIT = 893; // Excluding pokemons 100xx (No images available)
const LIST_MAX_ITEMS = 100;
const LIST_CHUNK_SIZE = 20;
const DEFAULT_LANG = 'en';

export const getPokemons = async (query) => {
  let list;
  if (query?.q) {
    list = await searchListItems(query, query?.limit, query?.offset);
  } else {
    list = await getListItems(query, query?.limit, query?.offset);
  }
  return list ?? [];
};

export const getPokemonDetails = async (query) => {
  return getDetails(query?.id, query?.lang);
};

export const getListItems = async (params, limit, offset) => {
  const itemList = await P.getPokemonsList({
    limit: limit || SEARCH_LIMIT,
  });
  const list = getChunk(itemList.results, offset);
  return getItems(list, params);
};

export const searchListItems = async (params, limit, offset) => {
  const itemList = await P.getPokemonsList({
    limit: limit || SEARCH_LIMIT,
  });
  const results = itemList.results.filter((item) => item.name.includes(params.q));
  const list = getChunk(results, offset);
  return getItems(list, params);
};

export const getDetails = async (id, lang) => {
  const [pokemon, species] = await Promise.all([P.getPokemonByName(id), P.getPokemonSpeciesByName(id)]);
  return (
    pokemon && {
      id: pokemon.name,
      code: formatCode(pokemon.id),
      slug: pokemon.name,
      name: translateName(species.names, lang),
      types: mapTypes(pokemon.types),
      color: species.color?.name,
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

const getItem = async (id) => {
  const pokemon = await P.getPokemonByName(id);
  const code = formatCode(pokemon.id);
  return {
    id,
    code,
    name: pokemon.name,
    slug: pokemon.name,
    types: mapTypes(pokemon.types),
    image: getPokemonImage(code),
  };
};

const getItems = async (list, params) => {
  const items = await Promise.all(
    list.map(async (item) => {
      return getItem(item.name, params?.lang || DEFAULT_LANG);
    })
  );
  return items.filter((pokemon) => !pokemon.evolvesFromId);
};

const getChunk = (list, offset) => {
  const chunkOffset = offset ?? 0;
  return list.slice(chunkOffset, LIST_CHUNK_SIZE + chunkOffset);
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

const getPokemonImage = (code) => `${preferences.pokemonImageUrlPrefix}/${code}.${preferences.pokemonImageType}`;
