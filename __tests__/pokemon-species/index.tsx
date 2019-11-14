import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from 'test-utils';
import { buildResourceList } from 'test-utils/generators';
import Index from '../../pages/pokemon-species/index';
import ResourceList from '../../src/models/resource-list';
import { fetchResourceList } from '../../src/utils/api';

jest.mock('../../src/utils/api', () => ({
  ...jest.requireActual('../../src/utils/api'),
  fetchResourceList: jest.fn()
}));

async function setup(resourceList: Promise<ResourceList>) {
  const mockFetchResourceList = fetchResourceList as jest.Mock;
  const router = {
    pathname: '/pokemon-species',
    route: '/pokemon-species'
  };

  mockFetchResourceList.mockReturnValue(resourceList);

  const context = { query: { pageLimit: 1, offset: 0 } };
  const initialProps = await Index.getInitialProps!(context as any);
  const utils = render(<Index {...initialProps} />, {
    router
  });

  return utils;
}

test('renders the page breadcrumb text', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: true,
    hasPrevUrl: false,
    resultsCount: 5,
    totalCount: 10
  });
  const { getAllByTestId } = await setup(Promise.resolve(resourceList));
  const breadcrumbText = getAllByTestId('breadcrumb-item');

  expect(breadcrumbText.length).toBe(1);
  expect(breadcrumbText[0]).toHaveTextContent('Pokemon species');
});

test('renders the pokemon cards when the pokemon were fetched successfully', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: true,
    hasPrevUrl: false,
    resultsCount: 5,
    totalCount: 10
  });
  const { getAllByTestId } = await setup(Promise.resolve(resourceList));
  const pokemon = getAllByTestId('pokemon-card');

  expect(pokemon.length).toBe(5);
});

test('renders the no results message when the fetched pokemon count is 0', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: false,
    hasPrevUrl: false,
    resultsCount: 0,
    totalCount: 0
  });
  const { queryByTestId, getByText } = await setup(
    Promise.resolve(resourceList)
  );
  const pokemon = queryByTestId('pokemon-card');

  expect(pokemon).toBeNull();
  expect(getByText(/no results/i)).toBeInTheDocument();
});

test('renders an error when the pokemon failed to fetch', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: true,
    hasPrevUrl: false,
    resultsCount: 5,
    totalCount: 10
  });
  const { queryByTestId, getByText } = await setup(
    Promise.reject(resourceList)
  );
  const pokemon = queryByTestId('pokemon-card');

  expect(pokemon).toBeNull();
  expect(getByText(/oops/i)).toBeInTheDocument();
});

test('renders the enabled next button when there are more pokemon results', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: true,
    hasPrevUrl: false,
    resultsCount: 5,
    totalCount: 10
  });
  const { getByTestId } = await setup(Promise.resolve(resourceList));
  const nextButton = getByTestId('resource-list-navigator-next');

  expect(nextButton).toHaveAttribute('aria-disabled', 'false');
});

test('renders the disabled next button when there are no more pokemon results', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: false,
    hasPrevUrl: true,
    resultsCount: 5,
    totalCount: 10
  });
  const { getByTestId } = await setup(Promise.resolve(resourceList));
  const nextButton = getByTestId('resource-list-navigator-next');

  expect(nextButton).toHaveAttribute('aria-disabled', 'true');
});

test('renders the enabled previous button when there are previous pokemon results', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: false,
    hasPrevUrl: true,
    resultsCount: 5,
    totalCount: 10
  });
  const { getByTestId } = await setup(Promise.resolve(resourceList));
  const prevButton = getByTestId('resource-list-navigator-prev');

  expect(prevButton).toHaveAttribute('aria-disabled', 'false');
});

test('renders the disabled previous button when there are no previous pokemon results', async () => {
  const resourceList = buildResourceList({
    hasNextUrl: true,
    hasPrevUrl: false,
    resultsCount: 5,
    totalCount: 10
  });
  const { getByTestId } = await setup(Promise.resolve(resourceList));
  const prevButton = getByTestId('resource-list-navigator-prev');

  expect(prevButton).toHaveAttribute('aria-disabled', 'true');
});
