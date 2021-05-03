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
  GetStatsQuery,
} from '../graphql/generated/graphql';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getTitle from '../utils/get-title';
import { PRODUCT_LIMIT, TIP_LIMIT } from '../utils/constants';
import { GeneralError } from '../components/error-screen';
import useAuth from '../hooks/useAuth';

//tu budu akoze ziskane macky uzivatela
const getDahsboardVariables: GetDashboardQueryVariables = {
  limitProducts: PRODUCT_LIMIT,
  limitTips: TIP_LIMIT,
  catIds: [2, 3],
};

const getCatVariables: GetCatsQueryVariables = {
  catIds: [2, 3],
  withProducts: true,
};

const CenterContainerQuery = () => {
  const {
    data: dashboardData,
    error: dashboardError,
    loading: dashboardLoading,
  } = useGetDashboardQuery({
    variables: getDahsboardVariables,
  });

  const extendedData = [
    {
      name: '--',
      icon: '/icons/avg_cost.svg',
      title: 'Priemerná mesačná spotreba',
    },
    {
      // name: String(dashboardData?.stats[0].brand_type) || '--',
      name: '?',
      icon: '/icons/fav_brand.svg',
      title: 'Moja najpopulárnejšia značka',
    },
  ];

  return (
    <CenterContainer>
      {dashboardLoading && <Loading />}
      {dashboardError && (
        <ErrorScreen error={GeneralError.fromApolloError(dashboardError)} />
      )}
      {dashboardData && (
        <>
          <TopFiveTable data={dashboardData.reviews} />
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
    variables: getCatVariables,
  });

  if (CatsLoading || CatsError) return <div>...</div>;

  return <CatsList cats={CatsData ? CatsData.cats : []} rows={'grid-rows-1'} />;
};

const pageTitle = getTitle('Prehľad');

export default function Home() {
  useAuth();
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

// export const getStaticProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['common'])),
//   },
// });
