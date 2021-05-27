import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import PaginationTable from '../components/pagination-table';
import { useGetReviewsQuery } from '../graphql/generated/graphql';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import getTitle from '../utils/get-title';
import { GeneralError } from '../components/error-screen';
import { getUser } from '../utils/user';

const Products = () => {
  const {
    data: reviewsData,
    error: reviewsError,
    loading: reviewsLoading,
  } = useGetReviewsQuery({
    variables: {
      user_id: getUser(),
    },
  });
  return (
    <CenterContainer>
      {reviewsLoading && <Loading />}
      {reviewsError && (
        <ErrorScreen error={GeneralError.fromApolloError(reviewsError)} />
      )}
      {reviewsData && (
        <>
          <PaginationTable
            reviews={reviewsData?.reviews}
            numberOfProducts={reviewsData?.reviews.length}
            title={`Všetky hodnotené produkty: ${reviewsData?.reviews.length}`}
          />
        </>
      )}
    </CenterContainer>
  );
};

const pageTitle = getTitle('Produkty');

export default function Home() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <Products />
      </Container>
    </Layout>
  );
}
