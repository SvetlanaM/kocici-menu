import SortIcon from './SortIcon';

interface TableHeadSortButtonProps {
  classNameFunction: void;
  onClick: () => void;
  value: string;
}
export default function TableHeadSortButton({
  classNameFunction,
  onClick,
  value,
}: TableHeadSortButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`${classNameFunction} flex items-center font-bold leading-normal focus:outline-none`}
      onClick={onClick}
    >
      <div className="mr-1">{value}</div>

      <SortIcon className="down" />
      <SortIcon className="up" rotate="transform rotate-180" />
    </button>
  );
}
