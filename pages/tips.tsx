import getTitle from '../utils/get-title';
import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import { GeneralError } from '../components/error-screen';
import TopTipsList from '../components/top-tips-list';
import { useGetTipsQuery } from '../graphql/generated/graphql';
import { getToken } from '../utils/token';
import TipsList from '../components/tips-list';

const TipsQuery = () => {
  const {
    data: tipData,
    error: tipError,
    loading: tipLoading,
  } = useGetTipsQuery();

  const user = getToken();
  const topArticlesFactory = (
    name: string,
    icon: string,
    title: string,
    category: string,
    slug: string
  ) => {
    return {
      name,
      icon,
      title,
      category,
      slug,
    };
  };

  const articleIcons = ['/icons/top2.svg', '/icons/top1.svg'];

  const topArticles =
    tipData &&
    user &&
    tipData.tips.filter((article) => {
      if (article.top_article) {
        return article;
      }
    });

  let top;
  top =
    tipData &&
    user &&
    topArticles.map((article, index) => {
      return topArticlesFactory(
        article.perex,
        articleIcons[index],
        article.name,
        article.category,
        article.slug
      );
    });

  const tips =
    tipData && tipData.tips.filter((tip) => !topArticles.includes(tip));

  return (
    <>
      <CenterContainer>
        {tipLoading && <Loading />}
        {tipError && (
          <ErrorScreen error={GeneralError.fromApolloError(tipError)} />
        )}
      </CenterContainer>
      {tipData && (
        <>
          <TopTipsList data={top} cols={'grid-cols-1 xl-custom:grid-cols-2'} />
          <TipsList data={tips} cols={'grid-cols-1'} isOnDashboard={false} />
        </>
      )}
    </>
  );
};
const pageTitle = getTitle('Tipy');

export default function Tips() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <TipsQuery />
      </Container>
    </Layout>
  );
}
