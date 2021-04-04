import Title from './title';
import TableRow from './table-row';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import TableHead from './table-head';
import TableFooter from './table-footer';
import Products from '../pages/products';

interface TopFiveTableProps {
  data: GetDashboardQuery['reviews'];
}
const TopFiveTable = ({ data }: TopFiveTableProps) => {
  return (
    <>
      <Title title="Moje najlepšie hodnotené produkty" />
      <table className="table-auto border-rounded-base border-gray small-purple-text text-left">
        <TableHead />
        <tbody className="font-light">
          {data && data.map((row) => <TableRow {...row} key={row.id} />)}
        </tbody>
        <TableFooter />
      </table>
    </>
  );
};

export default TopFiveTable;
