import { gql } from '@apollo/client';

export const ADD_CAT = gql`
  mutation AddCat($cat: Cat_insert_input!) {
    insert_Cat(objects: [$cat]) {
      returning {
        id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($review: Review_insert_input!) {
    insert_Review(objects: [$review]) {
      returning {
        id
      }
    }
  }
`;
