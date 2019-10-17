import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { toTitleCase } from '../utils/text';

interface Props {
  stats: any[];
}

const PokemonStatsProgress: React.FC<Props> = ({ stats }) => (
  <>
    {stats.map((stat, i) => (
      <Grid
        key={toTitleCase(stat.stat.name)}
        container
        wrap="nowrap"
        spacing={2}
        alignItems="center"
      >
        <Grid item xs>
          <Typography noWrap>{toTitleCase(stat.stat.name)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title={`Stat value: ${stat.base_stat}`} placement="top">
            <LinearProgress
              key={i}
              variant="determinate"
              value={stat.base_stat / 2}
            />
          </Tooltip>
        </Grid>
      </Grid>
    ))}
  </>
);

export default PokemonStatsProgress;
