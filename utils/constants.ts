import moment from 'moment';
import DateFormatObject from './getFormatDate';

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
