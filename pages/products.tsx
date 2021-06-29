import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import { useGetReviewsQuery } from '../graphql/generated/graphql';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import getTitle from '../utils/get-title';
import { GeneralError } from '../components/error-screen';
import { getUser } from '../utils/user';
import FilterForm from '../components/filter-form';

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
