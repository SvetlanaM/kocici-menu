import getTitle from '../utils/getTitle';
import Container from '../components/Containers/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Head';
import CenterContainer from '../components/Containers/CenterContainer';
import CatDetailContainer from '../components/CatDetailComponent/CatDetailContainer';
import ErrorScreen, { GeneralError } from '../components/ErrorScreen';
import Loading from '../components/Loading';
import { getUser } from '../utils/user';
import {
  useGetCatDetailQuery,
  useGetProductsQuery,
} from '../graphql/generated/graphql';
import CatDetailEmptyBox from '../components/CatDetailComponent/CatDetailEmptyBox';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
const CatDetailQuery = () => {
  const {
    data: catData,
    error: catError,
    loading: catLoading,
  } = useGetCatDetailQuery({
    variables: {
      user_id: getUser(),
      limit: 5,
      withProducts: true,
    },
  });

  const { data: productData } = useGetProductsQuery();

  return (
    <>
      {catLoading && !catError && (
        <CenterContainer>
          <Loading />
        </CenterContainer>
      )}
      {catError && (
        <CenterContainer>
          <ErrorScreen error={GeneralError.fromApolloError(catError)} />
        </CenterContainer>
      )}

      {productData && catData && catData.cat.length > 0 ? (
        <CatDetailContainer
          cats={catData.cat}
          products={productData.products}
        />
      ) : (
        catData && catData.cat.length === 0 && <CatDetailEmptyBox />
      )}
    </>
  );
};

export default function MyCats(): JSX.Element {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(cs['my_cats']));
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <CatDetailQuery />
      </Container>
    </Layout>
  );
}
