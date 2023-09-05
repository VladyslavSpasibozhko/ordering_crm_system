import { gql } from '@urql/core';
import { useQuery } from 'urql';

export const ProductCategoriesQuery = gql`
  query ProductCategories {
    categories {
      id
      title
    }
  }
`;

export function useCategories() {
  return useQuery({ query: ProductCategoriesQuery });
}
