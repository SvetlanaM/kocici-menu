import Container from '../../components/container';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import Header from '../../components/head';
import TipDetailBox from '../../components/tip-detail';
import {
  GetTipDetailQueryVariables,
  useTipDetailQuery,
} from '../../graphql/generated/graphql';
import { useRouter } from 'next/router';

const TipDetailQuery = () => {
  const router = useRouter();
  const { tip } = router.query;
  console.log(tip);
  const {
    loading: TipLoading,
    error: TipError,
    data: TipData,
  } = useTipDetailQuery({
    variables: {
      slug: String(tip),
    },
  });

  if (TipLoading || TipError) return <div>...</div>;

  console.log(TipData);
  return (
    <TipDetailBox
      name={TipData?.tip?.name}
      updated_at={TipData?.tip?.updated_at}
      description={TipData?.tip?.description!}
      slug={TipData?.tip?.slug!}
      id={TipData?.tip?.id!}
    />
  );
};

export default function TipDetail() {
  return (
    <Layout>
      <Header title="aaa" />
      <Sidebar />
      <Container>
        <TipDetailQuery />
      </Container>
    </Layout>
  );
}
