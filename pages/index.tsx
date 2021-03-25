import { GetCatsQuery } from '../generated/graphql';
import { getMenuItem, menu, MenuItem } from '../components/config';
import { useQuery, gql } from '@apollo/client';
import AddCat from '../components/dashboard/cats/add-cat';
import CatsSection, {
  fragment as CatSectionFragment,
} from '../components/dashboard/cats/cats';
import Common from '../components/common';
import Container from '../components/container';
import Head from 'next/head';
import InnerContainer from '../components/dashboard/container';
import Layout from '../components/layout';
import Main from '../components/main';
import Sidebar from '../components/sidebar/sidebar';
import StatisticsSection from '../components/statistics/statistics';
import TipsSection from '../components/tips/tips';
import Title from '../components/title';
import TopFiveTable from '../components/dashboard/top-five-table';
import { GetCatsQuery } from '../generated/graphql';

const CATS_QUERY = gql`
  query GetCats {
    cats: cat(limit: 10) {
      ...CatSectionFragment
    }
  }
  ${CatSectionFragment}
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{getMenuItem(MenuItem.Dashboard).name}</title>
      </Head>
      <Sidebar menuLinks={menu} />
      <Container>
        <Main<GetCatsQuery> query={CATS_QUERY}>
          {(data) => (
            <div className="container flex flex-wrap">
              <div className="w-9/12">
                <Title title="Moje najlepšie hodnotené produkty" />
                <TopFiveTable data={[]} />
                <InnerContainer flexType="flew-row">
                  <StatisticsSection data={[]} cols={'grid-cols-2'} />
                </InnerContainer>
                <InnerContainer flexType="flex-col">
                  <Title title="Tipy a odporúčania" />
                  <TipsSection data={[]} cols={'grid-cols-2'} />
                </InnerContainer>
              </div>
              <div className="w-3/12 pl-7">
                <Title title="Moje mačky" />
                <AddCat />
                <CatsSection cats={data.cats} rows={'grid-rows-1'} />
              </div>
            </div>
          )}
        </Main>
      </Container>
    </Layout>
  );
}
