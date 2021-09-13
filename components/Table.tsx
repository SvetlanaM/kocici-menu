import TableRow from './TableRow';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './TableHead';

import useSortableData from '../hooks/useSortableData';
import { useEffect, useMemo, useState } from 'react';
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
}: TableProps) => {
  const rules = {
    column: default_sort,
    direction: SortType.DESC,
  };

  const getUniqueReviews = () => {
    if (numberOfProducts === 5) {
      return Array.from(new Set(reviews.map((item) => item.product.name)))
        .slice(0, 5)
        .map((name) => {
          return reviews.find((item) => item.product.name === name);
        });
    } else {
      return reviews;
    }
  };

  const uniqueReviews = getUniqueReviews();

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
                : 'Ziadne produkty'}
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
