import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import ResourceList from '../models/resource-list';
import ResourceListLink from './resource-list-link';

interface Props {
  resourceList?: ResourceList;
}

const ResourceListNavigator: React.FC<Props> = ({ resourceList }) => {
  const nextUrl = resourceList ? resourceList.next : null;
  const previousUrl = resourceList ? resourceList.previous : null;

  return (
    <ButtonGroup variant="outlined">
      <ResourceListLink
        data-testid="resource-list-navigator-prev"
        url={previousUrl}
      >
        Previous
      </ResourceListLink>
      <ResourceListLink
        data-testid="resource-list-navigator-next"
        url={nextUrl}
      >
        Next
      </ResourceListLink>
    </ButtonGroup>
  );
};

export default ResourceListNavigator;
