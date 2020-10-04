/* global describe, it */
import { shallow } from 'enzyme';

import HomePage from '../pages/index';
import PokemonListPage from '../pages/pokemon/index';
import CaptureListPage from '../pages/capture/index';

describe('Pikadex Test', () => {
  it('Load Home page', () => {
    const initialData = {
      randomPokemons: [],
      query: {},
    };
    const homePage = shallow(<HomePage initialData={initialData} />);
    expect(homePage).toBeDefined();
  });

  it('Load Pokemon List page', () => {
    const initialData = {
      query: {},
    };
    const pokemonListPage = shallow(<PokemonListPage initialData={initialData} />);
    expect(pokemonListPage).toBeDefined();
  });

  it('Load Capture List page', () => {
    const initialData = {
      query: {},
    };
    const captureListPage = shallow(<CaptureListPage initialData={initialData} />);
    expect(captureListPage).toBeDefined();
  });
});
