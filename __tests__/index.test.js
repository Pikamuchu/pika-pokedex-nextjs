/* eslint-disable global-require */
/* global describe, it, expect */
import { shallow } from 'enzyme';

import Layout from '../src/components/layout/Layout';
import HomePage from '../pages/index';
import PokemonListPage from '../pages/pokemon/index';
import PokemonDetailsPage from '../pages/pokemon/[id]';
import CaptureListPage from '../pages/capture/index';
import CapturePage from '../pages/capture/[id]';
import AboutPage from '../pages/about/index';

describe('Pikadex Test', () => {

  const pokemonsData = require('./data/pokemonsData.json');

  it('Load Home page', () => {
    const initialData = {
      randomPokemons: pokemonsData,
    };
    const homePage = shallow(
      <Layout>
        <HomePage initialData={initialData} />
      </Layout>
    );
    expect(homePage).toBeDefined();
  });

  it('Load Pokemon List page', () => {
    const initialData = {
      query: {},
      pokemons: pokemonsData
    };
    const pokemonListPage = shallow(
      <Layout>
        <PokemonListPage initialData={initialData} />
      </Layout>
    );
    expect(pokemonListPage).toBeDefined();
  });

  it('Load Pokemon Details page', () => {
    const initialData = {
      query: {},
      pokemon: pokemonsData[0],
    };
    const pokemonDetailsPage = shallow(
      <Layout>
        <PokemonDetailsPage initialData={initialData} />
      </Layout>
    );
    expect(pokemonDetailsPage).toBeDefined();
  });

  it('Load Capture List page', () => {
    const captureListPage = shallow(
      <Layout>
        <CaptureListPage />
      </Layout>
    );
    expect(captureListPage).toBeDefined();
  });

  it('Load Capture page', () => {
    const initialData = {
      query: {},
      pokemon: pokemonsData[0],
    };
    const capturePage = shallow(
      <Layout>
        <CapturePage initialData={initialData} />
      </Layout>
    );
    expect(capturePage).toBeDefined();
  });

  it('Load About page', () => {
    const aboutPage = shallow(
      <Layout>
        <AboutPage />
      </Layout>
    );
    expect(aboutPage).toBeDefined();
  });
});
