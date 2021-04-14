import Container from '../../components/container';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import TipDetailBox from '../../components/tip-detail';
import { useTipDetailQuery } from '../../graphql/generated/graphql';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/error-screen';
import Loading from '../../components/loading';
import { GeneralError } from '../../components/error-screen';

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
      {TipLoading && <Loading />}
      {TipError && (
        <ErrorScreen error={GeneralError.fromApolloError(TipError)} />
      )}
      <TipDetailBox
        name={TipData?.tip?.name}
        updated_at={TipData?.tip?.updated_at}
        description={TipData?.tip?.description!}
        slug={TipData?.tip?.slug!}
        id={TipData?.tip?.id!}
      />
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
