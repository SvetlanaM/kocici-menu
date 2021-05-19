import getTitle from '../utils/get-title';
import AddCatBox from '../components/add-cat-box';
import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import CatDetailContainer from '../components/cat-detail-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import { GeneralError } from '../components/error-screen';
import { getUser } from '../utils/user';
import CatDetailSpecials from '../components/cat-detail-specials';
import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import { useGetCatDetailQuery } from '../graphql/generated/graphql';

export const CatDetailFieldsFragment = gql`
  fragment CatDetailFieldsFragment on Cat {
    ...CatFieldsFragment
    color
    daily_food
    weight
    nickname
  }
  ${CatFieldsFragment}
`;

const CatDetailQuery = () => {
  let user = getUser();
  const {
    data: catData,
    error: catError,
    loading: catLoading,
  } = useGetCatDetailQuery({
    variables: {
      user_id: getUser(),
      limit: 5,
    },
  });

  return (
    <CenterContainer>
      {catLoading && <Loading />}
      {catError && (
        <ErrorScreen error={GeneralError.fromApolloError(catError)} />
      )}
      {catData && <CatDetailContainer cats={catData.cat} />}
    </CenterContainer>
  );
};
const pageTitle = getTitle('Moje macky');

export default function MyCats() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <CatDetailQuery />
        <LeftContainer>
          <div className="mt-9.5">
            <AddCatBox />
          </div>
        </LeftContainer>
      </Container>
    </Layout>
  );
}
