import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../src/components/layout';
import PokemonMovesList from '../../src/components/pokemon-moves-list';
import PokemonStatsProgress from '../../src/components/pokemon-stats-progress';
import PokemonTypeChip from '../../src/components/pokemon-type-chip';
import { fetchPokemon } from '../../src/utils/api';
import {
  getPokemonAvatarById,
  pokemonIdFormatted
} from '../../src/utils/pokemon';
import { toTitleCase } from '../../src/utils/text';

interface Props {
  pokemon?: any;
}

const StyledTypeGrid = styled(Grid)<any>`
  list-style: none;
  padding: 0;
`;

const PokemonResource: NextPage<Props> = ({ pokemon }) => (
  <Layout>
    {pokemon ? (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  alt={pokemon.name}
                  src={getPokemonAvatarById(pokemon.id)}
                />
              }
              title={toTitleCase(pokemon.name)}
              subheader={pokemonIdFormatted(pokemon.id)}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Types
              </Typography>
              <StyledTypeGrid component="ul" container spacing={1}>
                {pokemon.types.map((type: any) => (
                  <Grid component="li" item key={type.type.name}>
                    <PokemonTypeChip type={type.type.name} />
                  </Grid>
                ))}
              </StyledTypeGrid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Stats
              </Typography>
              <PokemonStatsProgress stats={pokemon.stats} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Moves
              </Typography>
              <PokemonMovesList moves={pokemon.moves} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    ) : (
      <Typography component="p">
        Oops, the Pokemon you requested does not exist.
      </Typography>
    )}
  </Layout>
);

PokemonResource.getInitialProps = async ({ query }) => {
  const name = query.name as string;

  try {
    const pokemon = await fetchPokemon({ name });

    return { pokemon };
  } catch (e) {
    return { pokemon: undefined };
  }
};

export default PokemonResource;
