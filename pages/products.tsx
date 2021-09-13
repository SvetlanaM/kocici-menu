import Container from '../components/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { useGetReviewsQuery } from '../graphql/generated/graphql';
import Header from '../components/Head';
import CenterContainer from '../components/CenterContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import getTitle from '../utils/getTitle';
import { GeneralError } from '../components/ErrorScreen';
import { getUser } from '../utils/user';
import FilterForm from '../components/FilterForm';

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
    <Container>
      {reviewsLoading && (
        <CenterContainer>
          <Loading />
          {reviewsError && (
            <ErrorScreen error={GeneralError.fromApolloError(reviewsError)} />
          )}
        </CenterContainer>
      )}
      {reviewsData && (
        <>
          <FilterForm
            selectCats={reviewsData.selectCats}
            selectBrands={reviewsData.selectBrands}
            reviews={reviewsData?.reviews}
          />
        </>
      )}
    </Container>
  );
};

const pageTitle = getTitle('Produkty');

export default function Home() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Products />
    </Layout>
  );
}
