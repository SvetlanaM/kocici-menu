import TableRow from './table-row';

const TopFiveTable = ({ data }) => {
  return (
    <table className="table-auto border rounded-1.2xl border-gray text-left text-purple text-sm">
      <thead className="font-bold leading-normal">
        <tr>
          {/*<th>{data.headers}</th>*/}
          <th className="w-1/6 py-5"></th>
          <th className="w-1/4">Názov produktu</th>
          <th className="w-1/6">Hodnotené</th>
          <th className="w-1/6">Avg cena</th>
          <th className="w">Hodnotenie</th>
          <th className="pl-8 text-right pr-3.6 w-2/6">Súvisiace akcie</th>
        </tr>
      </thead>
      <tbody className="font-light">
        {data && <TableRow items={data.row} />}
      </tbody>
      <tfoot>
        <tr>
          <td className="py-5 pl-3.6 font-medium text-base" colSpan={5}>
            + Pridať hodnotenie nového produktu
          </td>
          <td className="text-sm text-gray font-light text-right pr-3.6 show-more">
            Zobraziť všetky
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TopFiveTable;
