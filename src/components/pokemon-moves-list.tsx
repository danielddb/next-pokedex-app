import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { FixedSizeList } from 'react-window';
import { toTitleCase } from '../utils/text';

interface Props {
  moves: any[];
}

const Row = (moves: any) => (props: any) => {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div">
      <ListItemText primary={toTitleCase(moves[index].move.name)} />
    </ListItem>
  );
};

const PokemonMovesList: React.FC<Props> = ({ moves }) => (
  <FixedSizeList
    width={'100%'}
    height={48 * 5}
    itemCount={moves.length}
    itemSize={48}
  >
    {Row(moves)}
  </FixedSizeList>
);

export default PokemonMovesList;
