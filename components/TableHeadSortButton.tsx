import SortIcon from './SortIcon';

export default function TableHeadSortButton({
  classNameFunction,
  onClick,
  value,
}) {
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
