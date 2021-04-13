import { useMemo } from 'react';
import {SortType} from '../utils/constants';



const useSortableData = (inputData: Array<any>, sortedColumn: any, setSortedColumn: any, nestedColumn?: string) => {
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

    setSortedColumn({ column, direction });
  };

  

  return { inputData: sortedTable, sortData };
}

export default useSortableData;