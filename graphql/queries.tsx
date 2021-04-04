import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import { TipFieldsFragment } from '../components/tip-box';
import { ProductFieldsFragment } from '../components/table-row';

export const CATS_QUERY = gql`
  query GetCats {
    cats: Cat(order_by: { name: asc }, where: { is_active: { _eq: true } }) {
      ...CatFieldsFragment
    }
  }
  ${CatFieldsFragment}
`;

export const DASHBOARD_QUERY = gql`
  query GetDashboard($limitProducts: Int, $limitTips: Int) {
    products: Product(
      order_by: { review: desc, review_updated_date: desc }
      limit: $limitProducts
    ) {
      ...ProductFieldsFragment
    }
    tips: Tip(
      order_by: { created_at: desc }
      where: { is_active: { _eq: true } }
      limit: $limitTips
    ) {
      ...TipFieldsFragment
    }
  }
  ${ProductFieldsFragment}
  ${TipFieldsFragment}
`;
