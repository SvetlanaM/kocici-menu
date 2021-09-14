import TableHeadSortButton from './TableHeadSortButton';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

enum ColumnTypes {
  UPDATED_AT = 'updated_at',
  AVG_PRICE = 'price',
  REVIEW_TYPE = 'review_type',
}

const TableHead = ({ sortedFunction, className }) => {
  const { t } = useTranslation();
  return (
    <thead className="font-bold leading-normal h-20 xl-custom:h-auto">
      <tr>
        <th className="w-1/6 py-5 px-10 xl-custom:px-2"></th>
        <th className="w-1/4 px-10 xl-custom:px-2">{t(sk['product_name'])}</th>
        <th className="w-1/6 px-10 xl-custom:px-2">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.UPDATED_AT)}
            onClick={() => sortedFunction(ColumnTypes.UPDATED_AT)}
            value={t(sk['review_date'])}
          />
        </th>
        <th className="w-1/6 xl-custom:px-0">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.AVG_PRICE)}
            onClick={() => sortedFunction(ColumnTypes.AVG_PRICE)}
            value={t(sk['avg_price'])}
          />
        </th>
        <th className="w px-10 xl-custom:px-2">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.REVIEW_TYPE)}
            onClick={() => sortedFunction(ColumnTypes.REVIEW_TYPE)}
            value={t(sk['review_info'])}
          />
        </th>
        <th className="w-2/6 pl-8 pr-3.6 text-right px-10 xl-custom:px-3.6">
          {t(sk['related_actions'])}
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
