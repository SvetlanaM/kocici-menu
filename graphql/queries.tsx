import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import { TipFieldsFragment } from '../components/tip-box';
import { ReviewFieldsFragment } from '../components/table-row';
import { TipDetailFieldsFragment } from '../components/tip-detail';
import { StatFieldsFragment } from '../components/statistic-box';

export const CATS_QUERY = gql`
  query GetCats($user_id: Int, $withProducts: Boolean!) {
    cats: Cat(
      where: { _and: { is_active: { _eq: true }, user_id: { _eq: $user_id } } }
      order_by: { name: asc }
    ) {
      ...CatFieldsFragment
    }
  }
  ${CatFieldsFragment}
`;

export const SelectProductFields = gql`
  fragment SelectProductFields on Product {
    id
    name
    brand_type
    image_url
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

export const DASHBOARD_QUERY = gql`
  query GetDashboard($limitTips: Int, $user_id: Int) {
    reviews: Review(
      order_by: { review_type: desc, updated_at: desc }
      where: { Cat: { user_id: { _eq: $user_id } } }
    ) {
      ...ReviewFieldsFragment
      id
    }
    tips: Tip(
      order_by: { created_at: desc }
      where: { is_active: { _eq: true } }
      limit: $limitTips
    ) {
      ...TipFieldsFragment
    }
    stats: brand_fav_type(limit: 1, where: { id: { _eq: $user_id } }) {
      ...StatFieldsFragment
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

export const STATS_QUERY = gql`
  query GetStats($user_id: Int) {
    stats: brand_fav_type(
      distinct_on: brand_type
      limit: 1
      where: { id: { _eq: $user_id } }
    ) {
      ...StatFieldsFragment
    }
  }
  ${StatFieldsFragment}
`;
