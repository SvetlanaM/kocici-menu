interface PaginationFooterProps {
  actualPageNumber: number;
  allPageNumber: number;
  getActualPageNumber: (stepType: 'NEXT' | 'PREV') => void;
}

const PaginationFooter = ({
  actualPageNumber,
  allPageNumber,
  getActualPageNumber,
}: PaginationFooterProps) => {
  const isHidden = () => {
    if (actualPageNumber === 1) {
      return 'hidden';
    }
  };

  const isHiddenLast = () => {
    if (actualPageNumber === allPageNumber) {
      return 'hidden';
    }
  };

  return (
    <tfoot className="">
      <tr className="pagination-row py-3 h-10">
        <td className="py-3 pl-3.6 base-medium-text" colSpan={5}></td>
        {allPageNumber > 1 && (
          <td className="pr-3.6 text-sm font-light text-gray text-right flex justify-end items-center py-3">
            <button onClick={() => getActualPageNumber('PREV')}>
              <img
                src="/icons/more.svg"
                height="20"
                className={`transform rotate-180 ${isHidden()}`}
              />
            </button>
            <span className="ml-2 mr-1 text-purple">{actualPageNumber}</span>
            {' / '}
            <span className="ml-1 mr-2">{allPageNumber}</span>
            <button onClick={() => getActualPageNumber('NEXT')}>
              <img
                src="/icons/more.svg"
                height="20"
                className={`${isHiddenLast()}`}
              />
            </button>
          </td>
        )}
      </tr>
    </tfoot>
  );
};

export default PaginationFooter;
