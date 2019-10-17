import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';
import ResourceList from '../models/resource-list';
import ResourceListLink from './resource-list-link';

interface Props {
  resourceList?: ResourceList;
}

const ResourceListNavigator: React.FC<Props> = ({ resourceList }) => {
  const nextUrl = resourceList ? resourceList.next : '';
  const previousUrl = resourceList ? resourceList.previous : '';

  return (
    <ButtonGroup variant="outlined">
      <ResourceListLink url={previousUrl}>Previous</ResourceListLink>
      <ResourceListLink url={nextUrl}>Next</ResourceListLink>
    </ButtonGroup>
  );
};

export default ResourceListNavigator;
