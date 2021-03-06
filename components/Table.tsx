import TableRow from './TableRow';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './TableHead';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import useSortableData from '../hooks/useSortableData';
import { useState } from 'react';
import {
  DEFAULT_TABLE_SORTING as default_sort,
  SortType,
} from '../utils/constants';
import NoReviews from './NoReviews';

interface TableProps {
  reviews: GetDashboardQuery['reviews'];
  Footer?: JSX.Element;
  numberOfProducts: number;
  offsetNumber: number;
  resetAfterSort?: () => void;
}

const Table = ({
  reviews,
  Footer,
  numberOfProducts,
  offsetNumber,
  resetAfterSort,
}: TableProps): JSX.Element => {
  const rules = {
    column: default_sort,
    direction: SortType.DESC,
  };
  const { t } = useTranslation();

  const uniqueReviews = reviews;

  const [sortedColumn, setSortedColumn] = useState(rules);
  const { inputData, sortData } = useSortableData(
    uniqueReviews,
    sortedColumn,
    setSortedColumn,
    'product',
    resetAfterSort
  );

  const getClassName = (name: string) => {
    if (!sortedColumn) {
      return;
    }
    return sortedColumn.column === name ? sortedColumn.direction : undefined;
  };

  return (
    <div className="overflow-auto xl-custom:overflow-visible">
      {uniqueReviews && uniqueReviews.length > 0 ? (
        <>
          <table className="table-auto rounded-t-lg border-t-1 border-l-1 border-r-1 border-gray small-purple-text text-left">
            <TableHead sortedFunction={sortData} className={getClassName} />
            <tbody className="font-light">
              {inputData
                ? inputData
                    .slice(offsetNumber, numberOfProducts)
                    .map((row) => <TableRow {...row} key={row.id} />)
                : t(cs['no_products'])}
            </tbody>
          </table>
          {Footer}
        </>
      ) : (
        <NoReviews />
      )}
    </div>
  );
};

export default Table;
