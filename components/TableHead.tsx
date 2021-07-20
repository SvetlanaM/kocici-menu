import TableHeadSortButton from './TableHeadSortButton';

enum ColumnTypes {
  UPDATED_AT = 'updated_at',
  AVG_PRICE = 'price',
  REVIEW_TYPE = 'review_type',
}

const TableHead = ({ sortedFunction, className }) => {
  return (
    <thead className="font-bold leading-normal h-20 xl-custom:h-auto">
      <tr>
        <th className="w-1/6 py-5 px-10 xl-custom:px-2"></th>
        <th className="w-1/4 px-10 xl-custom:px-2">Názov produktu</th>
        <th className="w-1/6 px-10 xl-custom:px-2">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.UPDATED_AT)}
            onClick={() => sortedFunction(ColumnTypes.UPDATED_AT)}
            value="Hodnotené"
          />
        </th>
        <th className="w-1/6 xl-custom:px-0">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.AVG_PRICE)}
            onClick={() => sortedFunction(ColumnTypes.AVG_PRICE)}
            value="Avg cena"
          />
        </th>
        <th className="w px-10 xl-custom:px-2">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.REVIEW_TYPE)}
            onClick={() => sortedFunction(ColumnTypes.REVIEW_TYPE)}
            value="Hodnotenie"
          />
        </th>
        <th className="w-2/6 pl-8 pr-3.6 text-right px-10 xl-custom:px-3.6">
          Súvisiace akcie
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
