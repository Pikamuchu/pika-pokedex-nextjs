import preferences from '../preferences';

const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex({
  protocol: 'https',
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
});

const SEARCH_LIMIT = 893; // Excluding pokemons 100xx (No images available)
const LIST_CHUNK_SIZE = preferences.pageSize;
const DEFAULT_LANG = 'en';

const customPokemonsList = require('./data/customPokemonsData.json');
const defaultData = require('./data/defaultPokemonData.json');

export const getPokemons = async (query) => {
  let list;
  const params = parseParams(query);
  if (params?.q) {
    list = await searchListItems(params);
  } else {
    list = await getListItems(params);
  }
  return list ?? [];
};

export const getPokemonDetails = async (query) => {
  return getDetails(query?.id, query?.lang);
};

export const getListItems = async (params) => {
  let list = await getPokemonsList();
  if (params.ids) {
    const idsArray = params.ids.split(',');
    list = list.filter((item) => idsArray.includes(item.name));
  }
  if (params.listType === 'random') {
    list = getRandomList(list);
  }
  list = getChunk(list, params.limit, params.offset);
  return getItems(list, params);
};

export const searchListItems = async (params, limit, offset) => {
  const itemList = await getPokemonsList();
  const results = itemList.filter((item) => item.name.includes(params.q));
  const list = getChunk(results, params.limit, params.offset);
  return getItems(list, params);
};

export const getDetails = async (id, lang) => {
  const [pokemon, species] = await Promise.all([getPokemonByName(id), getPokemonSpeciesByName(id)]);
  const code = formatCode(pokemon.id);
  return (
    pokemon && {
      id,
      code,
      name: pokemon.name,
      slug: pokemon.name,
      types: mapTypes(pokemon.types) ?? null,
      image: getPokemonImage(pokemon, code),
      imageRatio: pokemon.image_ratio ?? 1,
      tName: translateName(species?.names, lang) ?? null,
      color: species?.color?.name ?? null,
      evolvesFromId: species?.evolves_from_species?.name ?? null,
      abilities: pokemon.abilities?.map((item) => item.ability.name) ?? null,
      weight: pokemon.weight,
      height: pokemon.height,
      stats: mapStats(pokemon.stats) ?? null,
      category: '',
      description: '',
      gameConfig: mapGameConfig(pokemon.game_config) ?? null
    }
  );
};

const getPokemonsList = async () => {
  const pokemonsList = await P.getPokemonsList({
    limit: SEARCH_LIMIT
  });
  return [...pokemonsList.results, ...customPokemonsList];
};

const getPokemonByName = async (name) => {
  let pokemon = getCustomPokemonByName(name);
  if (!pokemon) {
    pokemon = await P.getPokemonByName(name);
  }
  return pokemon;
};

const getPokemonSpeciesByName = async (name) => {
  let pokemonSpecies = getCustomPokemonByName(name);
  if (!pokemonSpecies) {
    pokemonSpecies = await P.getPokemonSpeciesByName(name);
  }
  return pokemonSpecies;
};

const getCustomPokemonByName = (name) => {
  return customPokemonsList.find((item) => item.name === name);
};

const parseParams = (query) => {
  const params = { ...query };
  params.limit = query.limit ?? query.pageSize ?? LIST_CHUNK_SIZE;
  params.offset = query.offset ?? (query.pageIndex && params.limit * (query.pageIndex - 1)) ?? 0;
  return params;
};

const getItem = async (id) => {
  const pokemon = await getPokemonByName(id);
  const code = formatCode(pokemon.id);
  return {
    id,
    code,
    name: pokemon.name,
    slug: pokemon.name,
    types: mapTypes(pokemon.types),
    image: getPokemonImage(pokemon, code)
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

const getRandomList = (list) => {
  return list.slice().sort(() => Math.random() - Math.random());
};

const getChunk = (list, limit, offset) => {
  const chunkSize = limit || LIST_CHUNK_SIZE;
  const chunkOffset = offset ?? 0;
  return list.slice(chunkOffset, chunkSize + chunkOffset);
};

const formatCode = (code) => code && code.toString().padStart(3, '0');

const translateName = (translations, lang) => {
  const translation = translations && translations.filter((item) => item.language && item.language.name === lang);
  return translation && translation.length > 0 ? translation[0].name : null;
};

const mapTypes = (types) => {
  return types?.map((item) => {
    return item && { id: item.type?.name, name: item.type?.name };
  });
};

const mapStats = (stats) => {
  return stats?.map((item) => {
    return item && { name: item.stat?.name, value: item.base_stat };
  });
};

const getPokemonImage = (pokemon, code) => {
  return pokemon?.image ? pokemon.image : `${preferences.pokemonImageUrlPrefix}${code}.${preferences.pokemonImageType}`;
};

const mapGameConfig = (gameConfig) => {
  return {
    attacks: gameConfig?.attacks || null,
    audio: gameConfig?.audio || null,
    motionPath: gameConfig?.motionPath || defaultData.gameConfig.motionPath,
    maxSuccesRate: gameConfig?.maxSuccesRate || defaultData.gameConfig.maxSuccesRate
  };
};
