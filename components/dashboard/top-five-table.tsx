import TableRow from './table-row';

const TopFiveTable = ({ data }) => {
  return (
    <table className="table-auto border-rounded-base border-gray small-purple-text text-left">
      <thead className="font-bold leading-normal">
        <tr>
          {/*<th>{data.headers}</th>*/}
          <th className="w-1/6 py-5"></th>
          <th className="w-1/4">Názov produktu</th>
          <th className="w-1/6">Hodnotené</th>
          <th className="w-1/6">Avg cena</th>
          <th className="w">Hodnotenie</th>
          <th className="w-2/6 pl-8 pr-3.6 text-right">Súvisiace akcie</th>
        </tr>
      </thead>
      <tbody className="font-light">
        {data && <TableRow items={data.row} />}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-5 pl-3.6 base-medium-text" colSpan={5}>
            + Pridať hodnotenie nového produktu
          </td>
          <td className="pr-3.6 text-sm font-light text-gray text-right more-info">
            Zobraziť všetky
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TopFiveTable;
