import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

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

  const { t } = useTranslation();

  return (
    <div className="w-full flex border-b-1 border-l-1 border-r-1 rounded-b-lg border-gray">
      <div className="flex items-center justify-between w-full">
        <div className="py-3 pl-3.6 base-medium-text text-purple">
          <Link href="https://www.zoohit.cz/">
            <a target="new">{t(sk['to_eshop'])}</a>
          </Link>
        </div>

        <div className="pr-3.6 text-sm font-light text-gray text-right">
          {allPageNumber > 1 && (
            <div className="text-sm font-light text-gray text-right flex justify-end items-center py-3">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
