import Title from './title';
import TableRow from './table-row';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './table-head';
import TableFooter from './table-footer';
import useSortableData from '../hooks/useSortableData';
import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_TABLE_SORTING as default_sort,
  SortType,
} from '../utils/constants';

interface TopFiveTableProps {
  reviews: GetDashboardQuery['reviews'];
  selectCats?: GetDashboardQuery['selectCats'];
  selectProducts?: GetDashboardQuery['selectProducts'];
  onReviewSaveSuccess: () => void;
}

const TopFiveTable = ({
  reviews,
  selectCats,
  selectProducts,
  onReviewSaveSuccess,
}: TopFiveTableProps) => {
  const rules = {
    column: default_sort,
    direction: SortType.DESC,
  };

  const uniqueReviews = Array.from(
    new Set(reviews.map((item) => item.product.name))
  ).map((name) => {
    return reviews.find((item) => item.product.name === name);
  });

  const [sortedColumn, setSortedColumn] = useState(rules);
  const { inputData, sortData } = useSortableData(
    uniqueReviews,
    sortedColumn,
    setSortedColumn,
    'product'
  );

  useMemo(() => {
    setSortedColumn(rules);
  }, [onReviewSaveSuccess, reviews]);

  const getClassName = (name: string) => {
    if (!sortedColumn) {
      return;
    }
    return sortedColumn.column === name ? sortedColumn.direction : undefined;
  };

  return (
    <>
      <Title title="Moje najlepšie hodnotené produkty" />
      <table className="table-auto border-rounded-base border-gray small-purple-text text-left">
        <TableHead sortedFunction={sortData} className={getClassName} />
        <tbody className="font-light">
          {inputData
            ? inputData.map((row) => <TableRow {...row} key={row.id} />)
            : 'Ziadne produkty'}
        </tbody>
        {selectCats && selectProducts ? (
          <TableFooter
            selectCats={selectCats!}
            selectProducts={selectProducts!}
            onSaveSuccess={onReviewSaveSuccess}
          />
        ) : null}
      </table>
    </>
  );
};

export default TopFiveTable;
