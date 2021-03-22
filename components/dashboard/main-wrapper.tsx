import AddCat from './cats/add-cat';
import TipsSection from '../tips/tips';
import StatisticsSection from '../statistics/statistics';
import TopFiveTable from './top-five-table';
import CatsSection from './cats/cats';
import Container from './container';
import Title from '../title';
import { useQuery, gql } from '@apollo/client';
import { GetCatsQuery } from '../../generated/graphql';

const CATS_QUERY = gql`
  query GetCats {
    cats: cat(limit: 10) {
      id
      name
      age
      type
    }
  }
`;

function CatList() {
  const { loading, error, data } = useQuery<GetCatsQuery>(CATS_QUERY);

  if (!data) return null;
  return data.cats;
}

const DashboardPage = () => {
  const catsData = CatList();
  return (
    <>
      <div className="container flex flex-wrap">
        <div className="w-9/12">
          <Title title="Moje najlepšie hodnotené produkty" />
          <TopFiveTable data={[]} />
          <Container flexType="flew-row">
            <StatisticsSection data={[]} cols={'grid-cols-2'} />
          </Container>
          <Container flexType="flex-col">
            <Title title="Tipy a odporúčania" />
            <TipsSection data={[]} cols={'grid-cols-2'} />
          </Container>
        </div>
        <div className="w-3/12 pl-7">
          <Title title="Moje mačky" />
          <AddCat />
          <CatsSection data={catsData} rows={'grid-rows-1'} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
