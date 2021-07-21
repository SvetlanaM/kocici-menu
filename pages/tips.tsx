import getTitle from '../utils/getTitle';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Head';
import CenterContainer from '../components/CenterContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import { GeneralError } from '../components/ErrorScreen';
import TopTipsList from '../components/TopTipsList';
import { useGetTipsQuery } from '../graphql/generated/graphql';
import { getToken } from '../utils/token';
import TipsList from '../components/TipsList';

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
    tipData.tips
      .filter((article) => {
        if (article.top_article) {
          return article;
        }
      })
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 2);

  let top;
  top =
    tipData &&
    user &&
    topArticles.map((article, index) => {
      return topArticlesFactory(
        article.perex,
        articleIcons[index],
        article.name,
        article.category.comment,
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
