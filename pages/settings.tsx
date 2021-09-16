import getTitle from '../utils/getTitle';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Head';
import CenterContainer from '../components/CenterContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import { GeneralError } from '../components/ErrorScreen';
import UserBanner from '../components/UserBanner';
import UserStats from '../components/UserStats';
import LeftContainer from '../components/LeftContainer';
import { useGetUserStatsQuery } from '../graphql/generated/graphql';
import { getUser } from '../utils/user';
import DateFormatObject from '../utils/getFormatDate';
import UploadImage from '../components/UploadImage';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
const UserStatsQuery = () => {
  const lastWeek = DateFormatObject().lastWeek();

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

export default function Settings() {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(sk['settings']));
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <UserStatsQuery />
    </Layout>
  );
}
