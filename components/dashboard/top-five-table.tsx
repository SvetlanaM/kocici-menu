import TableRow from './table-row';

const TopFiveTable = ({ data }) => {
  return (
    <>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th>{data.headers}</th>
          </tr>
        </thead>
        <tbody className="text-gray">
          {data && <TableRow items={data.row} />}
        </tbody>
        <tfoot>Pridat nove hodnotenie produktu</tfoot>
      </table>
    </>
  );
};

export default TopFiveTable;
