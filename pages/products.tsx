import Container from '../components/Containers/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { useGetReviewsQuery } from '../graphql/generated/graphql';
import Header from '../components/Head';
import CenterContainer from '../components/Containers/CenterContainer';
import Loading from '../components/Loading';
import getTitle from '../utils/getTitle';
import { getUser } from '../utils/user';
import FilterForm from '../components/FilterForm';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import ErrorScreen, { GeneralError } from '../components/ErrorScreen';
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
            selectProductTypes={reviewsData.selectProductTypes}
          />
        </>
      )}
    </Container>
  );
};

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(cs['products_menu']));
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Products />
    </Layout>
  );
}
