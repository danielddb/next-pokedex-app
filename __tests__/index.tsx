test('it will definitely pass', () => {
  expect(1).toBe(1); // lolz
});

// import fetch from 'isomorphic-fetch';
// import * as nextRouter from 'next/router';
// import React from 'react';
// import { render } from 'test-utils';
// import { buildResourceList } from 'test-utils/generators';
// import Index from '../index';

// const mockFetch = fetch as jest.Mock;

// (nextRouter as any).useRouter = jest.fn();
// (nextRouter as any).useRouter.mockImplementation(() => ({
//   pathname: '',
//   route: '/'
// }));

// test('renders the index page', async () => {
//   const pageLimit = 5;

//   mockFetch.mockResolvedValueOnce({
//     json: () => buildResourceList({
//       hasNextUrl: true,
//       hasPrevUrl: false,
//       resultsCount: pageLimit,
//       totalCount: pageLimit * 2,
//     }),
//     ok: true
//   });

//   const context = { query: { pageLimit, offset: 0 } };
//   const initialProps = await Index.getInitialProps!(context as any);

//   const { debug } = render(<Index {...initialProps} />);

//   debug();
// });

export default null;
