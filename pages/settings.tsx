import getTitle from '../utils/getTitle';
import Container from '../components/Containers/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Head';
import CenterContainer from '../components/Containers/CenterContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import { GeneralError } from '../components/ErrorScreen';
import UserBanner from '../components/UserBanner';
import UserStats from '../components/UserStats';
import LeftContainer from '../components/LeftContainer';
import { useGetUserStatsQuery } from '../graphql/generated/graphql';
import { getUser } from '../utils/user';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { LAST_WEEK } from '../utils/constants';
const UserStatsQuery = () => {
  const lastWeek = LAST_WEEK;
  const {
    data: statsData,
    error: statsError,
    loading: statsLoading,
  } = useGetUserStatsQuery({
    variables: {
      user_id: getUser(),
      updated_at: lastWeek,
    },
  });

  return (
    <>
      <Container>
        <CenterContainer>
          {statsLoading && <Loading />}
          {statsError && (
            <ErrorScreen error={GeneralError.fromApolloError(statsError)} />
          )}
          {statsData && <UserBanner data={statsData} />}
        </CenterContainer>
        <LeftContainer>
          <UserStats data={statsData} />
        </LeftContainer>
      </Container>
    </>
  );
};

export default function Settings(): JSX.Element {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(cs['settings']));
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <UserStatsQuery />
    </Layout>
  );
}
