import Container from '../../components/container';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import TipDetailBox from '../../components/tip-detail';
import { useTipDetailQuery } from '../../graphql/generated/graphql';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/error-screen';
import Loading from '../../components/loading';
import { GeneralError } from '../../components/error-screen';
import Center from '../../components/center-container';
import Header from '../../components/head';
import getTitle from '../../utils/get-title';

const TipDetailQuery = () => {
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
        <Header title={getTitle(TipData?.tip?.name) || '...'} />
        <TipDetailBox
          name={TipData?.tip?.name}
          updated_at={TipData?.tip?.updated_at}
          description={TipData?.tip?.description!}
          slug={TipData?.tip?.slug!}
          id={TipData?.tip?.id!}
        />
      </Center>
    </Container>
  );
};

export default function TipDetail() {
  return (
    <Layout>
      <Sidebar />
      <TipDetailQuery />
    </Layout>
  );
}
