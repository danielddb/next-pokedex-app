import { NextPage } from 'next';
import React from 'react';
import Layout from '../../src/components/layout';
import ResourceList from '../../src/components/resource-list';
import ResourceListModel from '../../src/models/resource-list';
import { fetchResourceList } from '../../src/utils/api';

interface Props {
  resourceList?: ResourceListModel;
  error?: string;
}

const Index: NextPage<Props> = ({ resourceList, error }) => {
  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  }

  if (resourceList && !resourceList.results.length) {
    return (
      <Layout>
        <p>There are no results.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {resourceList && <ResourceList resourceList={resourceList} />}
    </Layout>
  );
};

Index.getInitialProps = async ({ query }) => {
  const { pageLimit: queryPageLimit, offset: queryOffset } = query;
  const pageLimit = queryPageLimit
    ? parseInt(queryPageLimit as string, 10)
    : 20;
  const offset = queryOffset ? parseInt(queryOffset as string, 10) : 0;

  try {
    const resourceList = await fetchResourceList({
      offset,
      pageLimit,
      resource: 'pokemon-species'
    });

    return { error: undefined, resourceList };
  } catch (e) {
    return {
      error: 'Oops, there was an error. Please try refreshing the app.',
      resourceList: undefined
    };
  }
};

export default Index;
