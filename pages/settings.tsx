import getTitle from '../utils/get-title';
import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import { GeneralError } from '../components/error-screen';
import UserBanner from '../components/user-banner';
import UserStats from '../components/user-stats';
import LeftContainer from '../components/left-container';
import { useGetUserStatsQuery } from '../graphql/generated/graphql';
import { getUser } from '../utils/user';
import DateFormatObject from '../utils/get-format-date';
import UploadImage from '../components/upload-image';

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
const pageTitle = getTitle('Nastavenia');

export default function Settings() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <UserStatsQuery />
    </Layout>
  );
}
