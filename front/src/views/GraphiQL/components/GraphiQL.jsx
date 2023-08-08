import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';

const fetcher = () => {
  const headers = {};

  const token = localStorage.getItem('token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return createGraphiQLFetcher({
    url: 'http://localhost:8080/api/graphql/',
    headers,
  });
};

export const GraphiQl = () => {
  return <GraphiQL fetcher={fetcher()} />;
};
