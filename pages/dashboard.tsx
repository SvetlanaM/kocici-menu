import AddCatBox from '../components/AddCatBox'
import CatsList from '../components/CatsList'
import Container from '../components/Container'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import StatisticsList from '../components/StatisticsList'
import TipsList from '../components/TipsList'
import Title from '../components/Title'
import TopFiveTable from '../components/TopFiveTable'
import {
  GetCatsQueryVariables,
  GetDashboardQueryVariables,
  useGetCatsQuery,
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
import { BackLinkType } from '../utils/backlinks';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
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
  const { t } = useTranslation();
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

  const arrToInstanceCountObj = (arr) =>
    arr &&
    arr.reduce((obj, e) => {
      obj[e.brand_type] = (obj[e.brand_type] || 0) + 1;
      return obj;
    }, {});

  const mostFavouriteByAll = arrToInstanceCountObj(
    dashboardData && Object.values(dashboardData.fav_stats)
  );

  const mostFavouriteByAllOne =
    mostFavouriteByAll &&
    Object.keys(mostFavouriteByAll).reduce((a, b) => {
      return mostFavouriteByAll[a] > mostFavouriteByAll[b] ? a : b;
    }, null);

  const extendedData = [
    {
      name: (mostFavouriteByAllOne && mostFavouriteByAllOne) || '--',
      icon: '/icons/avg_cost.svg',
      title: t(sk['fav_brand_others']),
    },
    {
      name:
        (dashboardData && dashboardData.stats.length > 0
          ? dashboardData.stats[0].brand_type
          : '--') || '--',
      icon: '/icons/fav_brand.svg',
      title: t(sk['fav_brand_mine']),
    },
  ];

  const tableTitle =
    dashboardData && dashboardData?.reviews.length === 0
      ? `${t(sk['no_reviewed_products'])}`
      : dashboardData?.reviews.length < 5
      ? `${dashboardData?.reviews.length} ${t(sk['best_products'])}`
      : `${t(sk['top_5'])} ${dashboardData?.reviews.length}`;

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
            numberOfProducts={5}
            title={tableTitle}
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

  if (CatsLoading) return <Loading />;
  if (CatsError) return null;

  return <CatsList cats={CatsData ? CatsData.cats : []} rows={'grid-rows-1'} />;
};

export default function Home() {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(sk['dashboard']));
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <CenterContainerQuery />
        <LeftContainer>
          <Title title={t(sk['my_cats'])} />
          <AddCatBox backlink={BackLinkType.DASHBOARD} />
          <DashboardCatQuery />
        </LeftContainer>
      </Container>
    </Layout>
  );
}
