import AddCatBox from '../components/AddCatBox';
import CatsList from '../components/CatsList';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import StatisticsList from '../components/StatisticsList';
import TipsList from '../components/TipsList';
import Title from '../components/Title';
import TopFiveTable from '../components/TopFiveTable';
import {
  useGetDashboardQuery,
  useGetCatsQuery,
  GetDashboardQueryVariables,
  GetCatsQueryVariables,
} from '../graphql/generated/graphql';
import Header from '../components/Head';
import CenterContainer from '../components/CenterContainer';
import LeftContainer from '../components/LeftContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import getTitle from '../utils/getTitle';
import { TIP_LIMIT } from '../utils/constants';
import { GeneralError } from '../components/ErrorScreen';
import { getUser } from '../utils/user';

//tu budu akoze ziskane macky uzivatela
const getDashboardVariables: GetDashboardQueryVariables = {
  limitTips: TIP_LIMIT,
  user_id: getUser(),
};

const getCatVariables: GetCatsQueryVariables = {
  user_id: getUser(),
  withProducts: true,
};

const CenterContainerQuery = () => {
  const {
    data: dashboardData,
    error: dashboardError,
    loading: dashboardLoading,
  } = useGetDashboardQuery({
    variables: {
      user_id: (getDashboardVariables.user_id = getUser()),
      limitTips: TIP_LIMIT,
    },
  });

  const extendedData = [
    {
      name: '--',
      icon: '/icons/avg_cost.svg',
      title: 'Priemerná mesačná spotreba',
    },
    {
      name:
        (dashboardData && dashboardData.stats.length > 0
          ? dashboardData.stats[0].brand_type
          : '--') || '--',
      icon: '/icons/fav_brand.svg',
      title: 'Moja najpopulárnejšia značka',
    },
  ];

  const handleReviewAdded = () => {
    //return router.reload();
  };

  return (
    <CenterContainer>
      {dashboardLoading && <Loading />}
      {dashboardError && (
        <ErrorScreen error={GeneralError.fromApolloError(dashboardError)} />
      )}
      {dashboardData && (
        <>
          <TopFiveTable
            reviews={dashboardData?.reviews}
            selectCats={dashboardData?.selectCats}
            selectProducts={dashboardData?.selectProducts}
            onReviewSaveSuccess={handleReviewAdded}
            numberOfProducts={5}
            title={`Top 5 najlepšie hodnotených produktov z ${dashboardData?.reviews.length}`}
            footerType="HOMEPAGE"
          />
          <StatisticsList data={extendedData} cols={'grid-cols-2'} />
          <TipsList
            data={dashboardData.tips}
            cols={'grid-cols-2'}
            isOnDashboard={true}
          />
        </>
      )}
    </CenterContainer>
  );
};

const DashboardCatQuery = () => {
  const {
    loading: CatsLoading,
    error: CatsError,
    data: CatsData,
  } = useGetCatsQuery({
    variables: {
      user_id: getUser(),
      withProducts: true,
      limit: 2,
    },
  });

  if (CatsLoading || CatsError) return <div>...</div>;

  return <CatsList cats={CatsData ? CatsData.cats : []} rows={'grid-rows-1'} />;
};

const pageTitle = getTitle('Prehľad');

export default function Home() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <CenterContainerQuery />
        <LeftContainer>
          <Title title="Moje mačky" />
          <AddCatBox />
          <DashboardCatQuery />
        </LeftContainer>
      </Container>
    </Layout>
  );
}
