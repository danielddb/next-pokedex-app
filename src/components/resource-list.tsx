import React from 'react';
import styled from 'styled-components';
import ResourceModel from '../models/resource';
import ResourceListModel from '../models/resource-list';
import PokemonCard from './pokemon-card';
import ResourceListNavigator from './resource-list-navigator';
import ResourcesGrid from './resources-grid';

interface Props {
  resourceList: ResourceListModel;
}

const VerticalRhythmn = styled.div`
  margin-bottom: ${props => props.theme.spacing(2) + 'px'};
`;

const ResourceList: React.FC<Props> = ({ resourceList }) => {
  const renderResource = React.useCallback(
    (resource: ResourceModel) => {
      return <PokemonCard resource={resource} />;
    },
    [resourceList]
  );

  return (
    <>
      <VerticalRhythmn>
        <ResourcesGrid
          resources={resourceList.results}
          renderResource={renderResource}
        />
      </VerticalRhythmn>
      <ResourceListNavigator resourceList={resourceList} />
    </>
  );
};

export default ResourceList;
