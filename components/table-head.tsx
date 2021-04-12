import TableHeadSortButton from '../components/table-head-sort-button';

enum ColumnTypes {
  UPDATED_AT = 'updated_at',
  AVG_PRICE = 'price',
  REVIEW_TYPE = 'review_type',
}

const TableHead = ({ sortedFunction, className }) => {
  return (
    <thead className="font-bold leading-normal">
      <tr>
        <th className="w-1/6 py-5"></th>
        <th className="w-1/4">Názov produktu</th>
        <th className="w-1/6">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.UPDATED_AT)}
            onClick={() => sortedFunction(ColumnTypes.UPDATED_AT)}
            value="Hodnotené"
          />
        </th>
        <th className="w-1/6">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.AVG_PRICE)}
            onClick={() => sortedFunction(ColumnTypes.AVG_PRICE)}
            value="Avg cena"
          />
        </th>
        <th className="w">
          <TableHeadSortButton
            classNameFunction={className(ColumnTypes.REVIEW_TYPE)}
            onClick={() => sortedFunction(ColumnTypes.REVIEW_TYPE)}
            value="Hodnotenie"
          />
        </th>
        <th className="w-2/6 pl-8 pr-3.6 text-right">Súvisiace akcie</th>
      </tr>
    </thead>
  );
};

export default TableHead;
