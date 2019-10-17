import { NextPage } from 'next';
import Router from 'next/router';

const Index: NextPage<{}> = () => null;

Index.getInitialProps = async ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: '/pokemon-species'
    });
    res.end();
  } else {
    Router.push('/pokemon-species');
  }
  return {};
};

export default Index;
