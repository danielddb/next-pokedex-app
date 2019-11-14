import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render, within } from 'test-utils';
import PokemonResource from '../../pages/pokemon-species/[name]';
import pokemonResource from '../../src/test/data/pikachu.json';
import { fetchPokemon } from '../../src/utils/api';

jest.mock('../../src/utils/api', () => ({
  ...jest.requireActual('../../src/utils/api'),
  fetchPokemon: jest.fn()
}));

async function setup(pokemon: Promise<any>) {
  const mockFetchResourceList = fetchPokemon as jest.Mock;
  const router = {
    asPath: '/pokemon-species/pikachu',
    pathname: '/pokemon-species/[name]',
    query: {
      name: 'pikachu'
    },
    route: '/pokemon-species/[name]'
  };

  mockFetchResourceList.mockReturnValue(pokemon);

  const context = { query: { name: 'pikachu' } };
  const initialProps = await PokemonResource.getInitialProps!(context as any);
  const utils = render(<PokemonResource {...initialProps} />, {
    router
  });

  return utils;
}

test('renders the page breadcrumb text', async () => {
  const { getAllByTestId } = await setup(Promise.resolve(pokemonResource));
  const breadcrumbText = getAllByTestId('breadcrumb-item');

  expect(breadcrumbText.length).toBe(2);
  expect(breadcrumbText[0]).toHaveTextContent('Pokemon species');
  expect(breadcrumbText[1]).toHaveTextContent('Pikachu');
});

test('renders the pokemon stats and shows a tooltip on hover when the pokemon data was fetched successfully', async () => {
  const { getAllByRole, getByText } = await setup(
    Promise.resolve(pokemonResource)
  );

  const progressBars = getAllByRole('progressbar');

  expect(progressBars.length).toBe(pokemonResource.stats.length);

  fireEvent.mouseOver(progressBars[0]); // hover first progress bar

  expect(getByText(/Stat value: 90/i)).toBeInTheDocument();
});

test('renders the pokemon types when the pokemon data was fetched successfully', async () => {
  const { getAllByTestId } = await setup(Promise.resolve(pokemonResource));

  const chips = getAllByTestId('pokemon-type-chip');

  expect(chips.length).toBe(pokemonResource.types.length);

  expect(within(chips[0]).getByText('Electric')).toBeInTheDocument();
});

test('renders an error when the pokemon failed to fetch / was not found', async () => {
  const { getByText } = await setup(Promise.reject());

  expect(getByText(/oops/i)).toBeInTheDocument();
});
