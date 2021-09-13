import { gql } from '@apollo/client';

export const ADD_CAT = gql`
  mutation AddCat($cat: Cat_insert_input!) {
    insert_Cat(objects: [$cat]) {
      returning {
        id
        age
        image_url
        name
        type
        doctor_email
        color
        daily_food
        specials: SpecialRequirements {
          name
        }
      }
    }
  }
`;

export const ADD_LOG = gql`
  mutation AddLog($log: Logging_insert_input!) {
    insert_Logging_one(object: $log) {
      id
    }
  }
`;

export const ADD_REVIEW_BULK = gql`
  mutation AddReviewBulk($reviews: [Review_insert_input!]!) {
    insert_Review(
      objects: $reviews
      on_conflict: {
        constraint: Review_product_id_cat_id_key
        update_columns: [product_id, cat_id, review_type]
      }
    ) {
      returning {
        product: Product {
          id
          name
          brand_type
          price
          image_url
        }
        cat: Cat {
          id
        }
        updated_at
        review_type
      }
    }
  }
`;
export const ADD_REVIEW = gql`
  mutation AddReview($review: Review_insert_input!) {
    insert_Review(objects: [$review]) {
      returning {
        product: Product {
          id
          name
          brand_type
          price
          image_url
        }
        cat: Cat {
          id
        }
        updated_at
        review_type
      }
    }
  }
`;

export const ADD_REVIEW_HISTORY_BULK = gql`
  mutation AddReviewHistoryBulk(
    $review_history: [ReviewHistory_insert_input!]!
  ) {
    insert_ReviewHistory(objects: $review_history) {
      returning {
        id
        product_id
        review_type
        cat_id
      }
    }
  }
`;

export const ADD_REVIEW_HISTORY = gql`
  mutation AddReviewHistory($review_history: ReviewHistory_insert_input!) {
    insert_ReviewHistory(objects: [$review_history]) {
      returning {
        id
        product_id
        review_type
        cat_id
      }
    }
  }
`;

export const UPDATE_CAT = gql`
  mutation UpdateCat($id: Int, $cats: Cat_set_input) {
    update_Cat(where: { id: { _eq: $id } }, _set: $cats) {
      affected_rows
      returning {
        id
        name
        age
        note
        type
        weight
        daily_food
        color
        nickname
      }
    }
  }
`;

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUser($id: String, $users: User_set_input) {
    update_User(where: { id: { _eq: $id } }, _set: $users) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const DELETE_CAT = gql`
  mutation DeleteCat($id: Int!) {
    delete_Cat_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($product_id: Int!, $cat_id: Int!) {
    delete_Review(
      where: { cat_id: { _eq: $cat_id }, product_id: { _eq: $product_id } }
    ) {
      returning {
        cat_id
        id
      }
    }
  }
`;
