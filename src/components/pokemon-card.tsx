import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import Resource from '../models/resource';
import { getPokemonAvatarById } from '../utils/pokemon';
import { toTitleCase } from '../utils/text';
import ButtonLink from './button-link';

interface Props {
  resource: Resource;
}

const PokemonCard: React.FC<Props> = ({ resource }) => {
  const id = resource.url
    .split('/')
    .slice(0, -1)
    .pop();

  const pokemonUrlParts = resource.url.split('/');
  const pokemonId = pokemonUrlParts[pokemonUrlParts.length - 2];
  const pokemonImageUrl = getPokemonAvatarById(pokemonId);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={resource.name} src={pokemonImageUrl} />}
        title={
          <ButtonLink
            href="/pokemon-species/[name]"
            as={`/pokemon-species/${id}`}
          >
            {toTitleCase(resource.name)}
          </ButtonLink>
        }
      />
    </Card>
  );
};

export default PokemonCard;
