import Title from './title';
import TableRow from './table-row';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './table-head';
import TableFooter from './table-footer';

interface TopFiveTableProps {
  data: GetDashboardQuery['products'];
}
const TopFiveTable = ({ data }: TopFiveTableProps) => {
  return (
    <>
      <Title title="Moje najlepšie hodnotené produkty" />
      <table className="table-auto border-rounded-base border-gray small-purple-text text-left">
        <TableHead />
        <tbody className="font-light">
          {data && data.map((row) => <TableRow key={row.id} {...row} />)}
        </tbody>
        <TableFooter />
      </table>
    </>
  );
};

export default TopFiveTable;
