import Title from './title';
import TableRow from './table-row';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './table-head';
import TableFooter from './table-footer';
import { useMemo, useState } from 'react';
import { DEFAULT_TABLE_SORTING as defaultSorting } from '../utils/constants';

interface TopFiveTableProps {
  data: GetDashboardQuery['reviews'];
}
const TopFiveTable = ({ data }: TopFiveTableProps) => {
  let sortedTable = [...data];

  const [sortedColumn, setSortedColumn] = useState({
    column: defaultSorting,
    direction: 'descending',
  });

  useMemo(() => {
    if (sortedColumn.column !== '') {
      sortedTable.sort((a, b) => {
        if (
          sortedColumn.column === 'price'
            ? a.product[sortedColumn.column] < b.product[sortedColumn.column]
            : a[sortedColumn.column] < b[sortedColumn.column]
        ) {
          return sortedColumn.direction === 'ascending' ? -1 : 1;
        }

        if (
          sortedColumn.column === 'price'
            ? a.product[sortedColumn.column] > b.product[sortedColumn.column]
            : a[sortedColumn.column] > b[sortedColumn.column]
        ) {
          return sortedColumn.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedTable;
  }, [data, sortedColumn]);

  const sortData = (column: string) => {
    let direction = 'ascending';

    if (
      sortedColumn.column === column &&
      sortedColumn.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortedColumn({ column, direction });
  };

  const getClassName = (name) => {
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
          {sortedTable &&
            sortedTable.map((row) => <TableRow {...row} key={row.id} />)}
        </tbody>
        <TableFooter />
      </table>
    </>
  );
};

export default TopFiveTable;
