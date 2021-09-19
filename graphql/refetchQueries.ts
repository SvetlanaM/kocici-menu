import { InternalRefetchQueryDescriptor } from '@apollo/client';
import { LAST_WEEK, PRODUCT_LIMIT, TIP_LIMIT } from './../utils/constants';
import {
  CATS_DETAIL_QUERY,
  DASHBOARD_QUERY,
  CATS_QUERY,
  USER_STATS_QUERY,
  REVIEWS_QUERY,
} from './queries';

export const getRefetchQueries = (
  user_id: string,
  required_queries: Array<string>
): Array<InternalRefetchQueryDescriptor> => {
  const ALL_QUERIES = {
    DASHBOARD_QUERY: {
      query: DASHBOARD_QUERY,
      variables: {
        limitTips: TIP_LIMIT,
        user_id: user_id,
      },
    },
    CATS_DETAIL_QUERY: {
      query: CATS_DETAIL_QUERY,
      variables: {
        user_id: user_id,
        withProducts: true,
        limit: PRODUCT_LIMIT,
      },
    },
    CATS_QUERY: {
      query: CATS_QUERY,
      variables: {
        user_id: user_id,
      },
    },
    USER_STATS_QUERY: {
      query: USER_STATS_QUERY,
      variables: {
        user_id: user_id,
        updated_at: LAST_WEEK,
      },
    },
    REVIEWS_QUERY: {
      query: REVIEWS_QUERY,
      variables: {
        user_id: user_id,
      },
    },
  };
  return required_queries.map((item) => ALL_QUERIES[item]);
};
