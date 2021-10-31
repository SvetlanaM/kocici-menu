import moment from 'moment';
import DateFormatObject from './getFormatDate';
import { GetDashboardQuery } from '../graphql/generated/graphql';

export const DEFAULT_CAT_IMAGE = '/default_cat.svg';
export const DEFAULT_PRODUCT_IMAGE = '/icons/default-product.svg';
export const APP_NAME = 'Kočičí menu';
export const SVETA_EMAIL = 'svetlana@margetova.eu';
export const PRODUCT_LIMIT = 5;
export const TIP_LIMIT = 4;
export const DEFAULT_TABLE_SORTING = 'review_type';
export enum SortType {
  ASC = 'ascending',
  DESC = 'descending',
}
export const ARRAY_REQUIREMENTS_LENGTH = 3;
export const CURRENT_MONTH = moment(moment(), 'YYYY/MM/DD').format('M');
export const CURRENT_YEAR = moment(moment(), 'YYYY/MM/DD').format('Y');
export const LAST_WEEK = DateFormatObject().lastWeek();
export const CAT_TYPE_NULL = 'CAT_TYPE_NULL';
export const OFFSET = 5;

export const getUniqueReviews = (
  reviews: GetDashboardQuery['reviews'],
  numberOfProducts?: number
): GetDashboardQuery['reviews'] => {
  if (numberOfProducts === 5) {
    return Array.from(
      new Set(reviews && reviews.map((item) => item.product.name))
    )
      .slice(0, 5)
      .map((name) => {
        return reviews.find((item) => item.product.name === name);
      });
  } else {
    return reviews;
  }
};
