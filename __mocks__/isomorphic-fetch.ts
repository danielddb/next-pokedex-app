const fetch = jest.fn(() =>
  Promise.reject('Must provide a mock implementation to fetch')
);

export default fetch;
