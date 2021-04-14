import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import { TipFieldsFragment } from '../components/tip-box';
import { ReviewFieldsFragment } from '../components/table-row';
import { TipDetailFieldsFragment } from '../components/tip-detail';
import { StatFieldsFragment } from '../components/statistic-box';

export const CATS_QUERY = gql`
  query GetCats($catIds: [Int!], $withProducts: Boolean!) {
    cats: Cat(
      where: { _and: { is_active: { _eq: true }, id: { _in: $catIds } } }
      order_by: { name: asc }
    ) {
      ...CatFieldsFragment
      reviews: Reviews(
        order_by: { review_type: desc, updated_at: desc }
        limit: 2
      ) @include(if: $withProducts) {
        products: Product {
          brand_type
          name
          image_url
        }
      }
    }
  }
  ${CatFieldsFragment}
`;

export const DASHBOARD_QUERY = gql`
  query GetDashboard($limitProducts: Int, $limitTips: Int, $catIds: [Int!]) {
    reviews: Review(
      order_by: { product_id: desc, review_type: desc, updated_at: desc }
      where: { cat_id: { _in: $catIds } }
      distinct_on: product_id
      limit: $limitProducts
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
    stats: brand_fav_type(distinct_on: brand_type, limit: 1) {
      ...StatFieldsFragment
    }
  }
  ${ReviewFieldsFragment}
  ${TipFieldsFragment}
  ${StatFieldsFragment}
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
  query GetStats {
    stats: brand_fav_type(distinct_on: brand_type, limit: 1) {
      ...StatFieldsFragment
    }
  }
  ${StatFieldsFragment}
`;
