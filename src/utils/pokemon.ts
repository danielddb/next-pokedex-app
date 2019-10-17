export const pokemonIdFormatted = (id: string | number, prefix = '#') =>
  prefix + `${id}`.padStart(3, '0');

export const getPokemonAvatarById = (id: string | number) =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonIdFormatted(
    id,
    ''
  )}.png`;
