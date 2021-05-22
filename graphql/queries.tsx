import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import { TipFieldsFragment } from '../components/tip-box';
import { ReviewFieldsFragment } from '../components/table-row';
import { TipDetailFieldsFragment } from '../components/tip-detail';
import { StatFieldsFragment } from '../components/statistic-box';
// import { CatDetailFieldsFragment } from '../pages/my-cats';

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

export const CatDetailFieldsFragment = gql`
  fragment CatDetailFieldsFragment on Cat {
    ...CatFieldsFragment
    reccommeded: Reviews(
      order_by: { review_type: desc, updated_at: desc }
      where: { Product: { brand_type: { _eq: $brand_type } } }
      limit: $limitProducts
    ) {
      ...ReviewFieldsFragment
    }
  }
  ${CatFieldsFragment}
  ${ReviewFieldsFragment}
`;

export const CATS_DETAIL_QUERY = gql`
  query GetCatDetail(
    $user_id: String
    $withProducts: Boolean!
    $limit: Int
    $brand_type: String
    $limitProducts: Int
    $cat_id: Int
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
  query GetDashboard($limitTips: Int, $user_id: String) {
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
    stats: brand_fav_type1(limit: 1, where: { user_id: { _eq: "123" } }) {
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
