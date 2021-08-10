import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/CatBox';
import { TipFieldsFragment } from '../components/TipBox';
import { ReviewFieldsFragment } from '../components/TableRow';
import { TipDetailFieldsFragment } from '../components/TipDetail';
import { StatFieldsFragment } from '../components/StatisticBox';
import { ProductFieldsFragment } from '../components/CatDetailProductTable';
import {
  UserStatsFieldFragment,
  UserFieldFragment,
} from '../components/UserStats';

export const CATS_QUERY = gql`
  query GetCats($user_id: String, $withProducts: Boolean!, $limit: Int) {
    cats: Cat(
      where: { _and: { is_active: { _eq: true }, user_id: { _eq: $user_id } } }
      order_by: { name: asc }
    ) {
      ...CatFieldsFragment
    }
  }
  ${CatFieldsFragment}
`;

export const CAT_BY_PK = gql`
  query GetCatById($id: Int!, $withProducts: Boolean!, $limit: Int) {
    cat: Cat_by_pk(id: $id) {
      ...CatFieldsFragment
    }
  }
  ${CatFieldsFragment}
`;

export const PRODUCT_QUERY = gql`
  query getProducts {
    products: Product {
      ...ProductFieldsFragment
    }
  }
  ${ProductFieldsFragment}
`;

export const CatDetailFieldsFragment = gql`
  fragment CatDetailFieldsFragment on Cat {
    ...CatFieldsFragment
  }
  ${CatFieldsFragment}
`;

export const CATS_DETAIL_QUERY = gql`
  query GetCatDetail(
    $user_id: String
    $withProducts: Boolean!
    $limit: Int
    $brand_type: String
    $limitProducts: Int
  ) {
    cat: Cat(
      where: { _and: { is_active: { _eq: true }, user_id: { _eq: $user_id } } }
      order_by: { name: asc }
    ) {
      ...CatDetailFieldsFragment
    }
  }
  ${CatDetailFieldsFragment}
`;
export const SelectProductFields = gql`
  fragment SelectProductFields on Product {
    id
    name
    brand_type
    image_url
  }
`;

export const SelectBrandTypeFields = gql`
  fragment SelectBrandTypeFields on BrandType {
    value
    comment
  }
`;

export const SelectCatFields = gql`
  fragment SelectCatFields on Cat {
    id
    name
    image_url
    reviews: Reviews {
      product_id
      review_type
    }
  }
`;

export const REVIEWS_QUERY = gql`
  query GetReviews($user_id: String) {
    reviews: Review(
      order_by: { review_type: desc, updated_at: desc }
      where: { Cat: { user_id: { _eq: $user_id } } }
    ) {
      ...ReviewFieldsFragment
      id
    }
    selectCats: Cat(
      where: { _and: { is_active: { _eq: true }, user_id: { _eq: $user_id } } }
      order_by: { name: asc }
    ) {
      ...SelectCatFields
    }
    selectBrands: BrandType(order_by: { comment: asc }) {
      ...SelectBrandTypeFields
    }
  }
  ${ReviewFieldsFragment}
  ${SelectCatFields}
  ${SelectBrandTypeFields}
`;

export const DASHBOARD_QUERY = gql`
  query GetDashboard($limitTips: Int, $user_id: String) {
    reviews: Review(
      order_by: { review_type: desc, updated_at: desc }
      where: { Cat: { user_id: { _eq: $user_id } } }
    ) {
      ...ReviewFieldsFragment
      id
    }
    tips: Tip(
      order_by: { updated_at: desc }
      where: { is_active: { _eq: true } }
      limit: $limitTips
    ) {
      ...TipFieldsFragment
    }
    stats: brand_fav_type(
      where: { id: { _eq: $user_id } }
      order_by: { user_id: desc }
      limit: 1
    ) {
      ...StatFieldsFragment
    }
    fav_stats: brand_fav_type {
      brand_type
    }
    selectCats: Cat(
      where: { _and: { is_active: { _eq: true }, user_id: { _eq: $user_id } } }
      order_by: { name: asc }
    ) {
      ...SelectCatFields
    }
    selectProducts: Product {
      ...SelectProductFields
    }
  }
  ${ReviewFieldsFragment}
  ${TipFieldsFragment}
  ${StatFieldsFragment}
  ${SelectCatFields}
  ${SelectProductFields}
`;

export const TIP_DETAIL_QUERY = gql`
  query TipDetail($slug: String!) {
    tip: Tip_by_pk(slug: $slug) {
      ...TipDetailFragment
    }
  }
  ${TipDetailFieldsFragment}
`;

export const USER_STATS_QUERY = gql`
  query GetUserStats($user_id: String!, $updated_at: timestamptz) {
    user_stats(where: { id: { _eq: $user_id } }) {
      ...UserStatsFieldFragment
    }
    stats: brand_fav_type(
      where: { id: { _eq: $user_id } }
      order_by: { user_id: desc }
      limit: 1
    ) {
      ...StatFieldsFragment
    }
    reviews_count: Review_aggregate(
      where: {
        _and: {
          Cat: { user_id: { _eq: $user_id } }
          updated_at: { _gt: $updated_at }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    user_data: User(where: { id: { _eq: $user_id } }) {
      ...UserFieldFragment
    }
  }
  ${UserStatsFieldFragment}
  ${StatFieldsFragment}
  ${UserFieldFragment}
`;

export const TIPS_QUERY = gql`
  query getTips {
    tips: Tip(
      order_by: { updated_at: desc }
      where: { is_active: { _eq: true } }
    ) {
      top_article
      ...TipFieldsFragment
    }
  }
  ${TipFieldsFragment}
`;
