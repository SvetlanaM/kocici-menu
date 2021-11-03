import Container from '../../components/Containers/Container';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import TipDetailBox from '../../components/TipDetail';
import { useTipDetailQuery } from '../../graphql/generated/graphql';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/ErrorScreen';
import Loading from '../../components/Loading';
import { GeneralError } from '../../components/ErrorScreen';
import Center from '../../components/Containers/CenterContainer';
import Header from '../../components/Head';
import getTitle from '../../utils/getTitle';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

const TipDetailQuery = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { tip } = router.query;
  const {
    loading: TipLoading,
    error: TipError,
    data: TipData,
  } = useTipDetailQuery({
    variables: {
      slug: String(tip),
    },
  });

  return (
    <Container>
      <Center>
        {TipLoading && <Loading />}
        {TipError && (
          <ErrorScreen error={GeneralError.fromApolloError(TipError)} />
        )}
        <Header
          title={
            TipData?.tip?.name ? getTitle(TipData?.tip?.name) : t(cs['loading'])
          }
        />
        <TipDetailBox
          name={TipData?.tip?.name}
          updated_at={TipData?.tip?.updated_at}
          description={TipData?.tip && TipData?.tip?.description}
          slug={TipData?.tip?.slug}
          id={TipData?.tip?.id}
          perex={TipData?.tip?.perex}
          category={TipData?.tip?.category}
        />
      </Center>
    </Container>
  );
};

export default function TipDetail(): JSX.Element {
  return (
    <Layout>
      <Sidebar />
      <TipDetailQuery />
    </Layout>
  );
}
