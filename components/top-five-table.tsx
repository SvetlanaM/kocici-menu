import Title from './title';
import TableRow from './table-row';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './table-head';
import TableFooter from './table-footer';
import useSortableData from '../hooks/useSortableData';
import { useState } from 'react';
import {
  DEFAULT_TABLE_SORTING as default_sort,
  SortType,
} from '../utils/constants';
interface TopFiveTableProps {
  data: GetDashboardQuery['reviews'];
}

const TopFiveTable = ({ data }: TopFiveTableProps) => {
  const rules = {
    column: default_sort,
    direction: SortType.DESC,
  };
  const [sortedColumn, setSortedColumn] = useState(rules);
  const { inputData, sortData } = useSortableData(
    data,
    sortedColumn,
    setSortedColumn,
    'product'
  );

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
          {inputData &&
            inputData.map((row) => <TableRow {...row} key={row.id} />)}
        </tbody>
        <TableFooter />
      </table>
    </>
  );
};

export default TopFiveTable;
