import AddCatBox from '../components/add-cat-box';
import CatsList from '../components/cats-list';
import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import StatisticsList from '../components/statistics-list';
import TipsList from '../components/tips-list';
import Title from '../components/title';
import TopFiveTable from '../components/top-five-table';
import {
  useGetDashboardQuery,
  useGetCatsQuery,
  GetDashboardQueryVariables,
  GetCatsQueryVariables,
} from '../graphql/generated/graphql';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
// import {
//   serverSideTranslations,
//   Locale,
// } from 'next-i18next/serverSideTranslations';
import getTitle from '../utils/get-title';
import { TIP_LIMIT } from '../utils/constants';
import { GeneralError } from '../components/error-screen';
import setUppercaseTitle from '../utils/set-uppercase-title';
import { getUser } from '../utils/user';
import useAuth from '../hooks/useAuth';

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
      name: setUppercaseTitle('Feringa'),
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
          />
          <StatisticsList data={extendedData} cols={'grid-cols-2'} />
          <TipsList data={dashboardData.tips} cols={'grid-cols-2'} />
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
      user_id: (getCatVariables.user_id = getUser()),
      withProducts: true,
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
