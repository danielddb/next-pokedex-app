import { name as fakeName } from 'faker';
import Resource from '../models/resource';
import ResourceList from '../models/resource-list';

export const buildResource = (
  name: string = fakeName.firstName()
): Resource => ({
  name,
  url: `https://pokeapi.co/api/v2/pokemon-species/${name}/`
});

interface BuildResourceListParams {
  totalCount: number;
  resultsCount: number;
  hasNextUrl: boolean;
  hasPrevUrl: boolean;
}

export const buildResourceList = ({
  totalCount,
  resultsCount,
  hasNextUrl,
  hasPrevUrl
}: BuildResourceListParams): ResourceList => ({
  count: totalCount,
  next: hasNextUrl
    ? `https://pokeapi.co/api/v2/pokemon-species?offset=${resultsCount *
        2}&limit=${resultsCount}`
    : null,
  previous: hasPrevUrl
    ? `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${resultsCount}`
    : null,
  results: Array(resultsCount)
    .fill(null)
    .map(() => buildResource())
});
