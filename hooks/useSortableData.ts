import { useMemo } from 'react';
import { SortType } from '../utils/constants';

const useSortableData = <T extends unknown>(
  inputData: Array<T>,
  sortedColumn: { column: string; direction: SortType },
  setSortedColumn: ({ column: string, direction: SortType }) => void,
  nestedColumn?: string,
  resetAfterSort?: () => void
): any => {
  let sortedTable = [...inputData];

  useMemo(() => {
    if (sortedColumn !== null) {
      sortedTable.sort((a, b) => {
        const valA =
          sortedColumn.column === 'price' && nestedColumn !== undefined
            ? a[nestedColumn][sortedColumn.column]
            : a[sortedColumn.column];
        const valB =
          sortedColumn.column === 'price' && nestedColumn !== undefined
            ? b[nestedColumn][sortedColumn.column]
            : b[sortedColumn.column];

        if (valA > valB) {
          return 1;
        }

        if (valA < valB) {
          return -1;
        }

        return 0;
      });
    }

    return sortedColumn.direction === SortType.ASC
      ? sortedTable
      : sortedTable.reverse();
  }, [inputData, sortedColumn]);

  const sortData = (column: string) => {
    let direction = SortType.ASC;

    if (
      sortedColumn &&
      sortedColumn.column === column &&
      sortedColumn.direction === SortType.ASC
    ) {
      direction = SortType.DESC;
    }

    if (typeof resetAfterSort !== 'undefined') {
      resetAfterSort();
    }

    setSortedColumn({ column, direction });
  };

  return { inputData: sortedTable, sortData };
};

export default useSortableData;
