import AddCat from './cats/add-cat';
import TipsSection from '../tips/tips';
import StatisticsSection from '../statistics/statistics';
import TopFiveTable from './top-five-table';
import CatsSection from './cats/cats';
import Container from './container';
import Title from '../title';

const DashboardPage = ({ data }) => {
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
          {/* <CatsSection {...data} rows={'grid-rows-1'} /> */}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
