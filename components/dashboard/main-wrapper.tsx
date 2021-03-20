import AddCat from './cats/add-cat';
import TipsSection from '../tips/tips';
import StatisticsSection from '../statistics/statistics';
import TopFiveTable from './top-five-table';
import CatsSection from './cats/cats';
import Container from './container';
import Title from '../title';

const DashboardPage = () => {
  return (
    <>
      <p>test</p>
      <div className="w-50 m-12">
        <Container>
          <Title title="Top 5 produktov mojich maciek" />
          <TopFiveTable data={[]} />
        </Container>
        <StatisticsSection data={[]} />
        <Container>
          <Title title="Tipy a odporucania" />
          <TipsSection data={[]} />
        </Container>
      </div>
      <div className="w-50 m-12">
        <Container>
          <Title title="Moje macky" />
          <AddCat />
        </Container>
        <CatsSection data={[]} />
      </div>
    </>
  );
};

export default DashboardPage;
