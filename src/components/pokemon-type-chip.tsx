import Chip from '@material-ui/core/Chip';
import blue from '@material-ui/core/colors/blue';
import brown from '@material-ui/core/colors/brown';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import React from 'react';
import styled from 'styled-components';
import { toTitleCase } from '../utils/text';

interface Props {
  type: string;
}

function getColourByType(type: string) {
  switch (type) {
    case 'bug':
    case 'grass':
      return green[300];
    case 'electric':
      return yellow[300];
    case 'fairy':
      return pink[100];
    case 'fire':
      return red[300];
    case 'flying':
      return grey[200];
    case 'ghost':
      return purple[100];
    case 'ground':
      return brown[300];
    case 'ice':
      return blue[100];
    case 'poison':
      return purple[300];
    case 'psychic':
      return purple[900];
    case 'dark':
    case 'rock':
      return grey[900];
    case 'water':
      return blue[300];
    default:
      return null;
  }
}

const StyledChip = styled(Chip)<{ type: string }>`
  ${props => {
    const colour = getColourByType(props.type);

    if (!colour) {
      return;
    }

    return `
      background: ${colour};
      color: ${props.theme.palette.getContrastText(colour)};
    `;
  }}
`;

const PokemonTypeChip: React.FC<Props> = ({ type }) => {
  return (
    <StyledChip
      label={toTitleCase(type)}
      type={type}
      data-testid="pokemon-type-chip"
    />
  );
};

export default PokemonTypeChip;
