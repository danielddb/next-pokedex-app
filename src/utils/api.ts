import fetch from 'isomorphic-fetch';
import ResourceList from '../models/resource-list';

export interface ResourceListParams {
  resource: string;
  pageLimit: number;
  offset: number;
}

/**
 * Converts a resource list url e.g. https://pokeapi.co/api/v2/pokemon-species?offset=60&limit=20
 * to ResourceListParams
 * @param url string
 */
export const resourceListUrlParser = (
  url: string
): ResourceListParams | null => {
  const urlMatch = url.match(/https:\/\/pokeapi\.co\/api\/v2\/(.+)/);

  if (urlMatch && urlMatch[1]) {
    const [resource, queryParams] = urlMatch[1].split('?');
    const pageLimitMatch = queryParams.match(/limit=(\d+)/);
    const offsetMatch = queryParams.match(/offset=(\d+)/);

    const pageLimit = parseInt(
      (pageLimitMatch && pageLimitMatch[1]) || '20',
      10
    );
    const offset = parseInt((offsetMatch && offsetMatch[1]) || '0', 10);

    return { resource, pageLimit, offset };
  } else {
    return null;
  }
};

export const fetchResourceList = async ({
  resource,
  pageLimit,
  offset
}: ResourceListParams) => {
  const params = new URLSearchParams();

  if (typeof pageLimit === 'number') {
    params.append('limit', pageLimit.toString());
  }

  if (typeof offset === 'number') {
    params.append('offset', offset.toString());
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/${resource}${params && `?${params}`}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as ResourceList;
};

export interface GetPokemonParams {
  name: string;
}

export const fetchPokemon = async ({ name }: GetPokemonParams) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as any;
};
