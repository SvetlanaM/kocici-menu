import Title from './Title';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import Table from './Table';
import PaginationFooter from './PaginationFooter';
import { useEffect, useState } from 'react';
interface PaginationTableProps {
  reviews: GetDashboardQuery['reviews'];
  title: string;
  numberOfProducts?: number;
}

const PaginationTable = ({
  reviews,
  title,
  numberOfProducts,
}: PaginationTableProps) => {
  const offset = 3;
  const allPageNumber = Math.ceil(numberOfProducts / offset);
  const reviewsCopy = [...reviews];
  const [actualPageNumber, setActualPageNumber] = useState<number>(1);
  const [offsetNumber, setOffsetNumber] = useState<number>(offset);
  const [offsetStart, setOffsetStartNumber] = useState<number>(0);

  useEffect(() => {
    resetAfterSort()
  }, [reviews])

  const resetAfterSort = () => {
    setActualPageNumber(1);
    setOffsetNumber(offset);
    setOffsetStartNumber(0);
  };

  const getActualPageNumber = (stepType: 'NEXT' | 'PREV') => {
    if (stepType === 'NEXT') {
      setActualPageNumber((prevNumber) => prevNumber + 1);
      setOffsetNumber((prevNumber) => prevNumber + offset);
      setOffsetStartNumber(offsetNumber);
    }
    if (stepType === 'PREV') {
      setActualPageNumber((prevNumber) => prevNumber - 1);
      setOffsetNumber((prevNumber) => prevNumber - offset);
      setOffsetStartNumber(offsetStart - offset);
    }
  };

  return (
    <div className="w-full">
      <Title title={title} />

      <Table
        reviews={reviewsCopy}
        Footer={
          <PaginationFooter
            actualPageNumber={actualPageNumber}
            allPageNumber={allPageNumber}
            getActualPageNumber={getActualPageNumber}
          />
        }
        numberOfProducts={offsetNumber}
        offsetNumber={offsetStart}
        resetAfterSort={resetAfterSort}
      />
    </div>
  );
};

export default PaginationTable;
