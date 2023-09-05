import { gql } from '@urql/core';

export const UserByEmailQuery = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      first_name
      last_name
      email
      role {
        id
        title
      }
    }
  }
`;
