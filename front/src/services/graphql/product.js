import { gql } from '@urql/core';
import { useQuery } from 'urql';

export const ProductsQuery = gql`
  query Products {
    products {
      id
      title
      cost
      category {
        id
        title
      }
    }
  }
`;

export function useProducts() {
  return useQuery({ query: ProductsQuery });
}
