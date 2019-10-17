import Grid from '@material-ui/core/Grid';
import React from 'react';
import Resource from '../models/resource';

interface Props {
  resources: Resource[];
  renderResource: (resource: Resource) => any;
}

const ResourcesGrid: React.FC<Props> = ({ resources, renderResource }) => (
  <Grid container spacing={3}>
    {resources.map(resource => (
      <Grid item xs={12} md={4} lg={3} key={resource.name}>
        {renderResource(resource)}
      </Grid>
    ))}
  </Grid>
);

export default ResourcesGrid;
