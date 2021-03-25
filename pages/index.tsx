import Common from '../components/common';
import { MenuItem } from '../components/config';
import { useQuery, gql } from '@apollo/client';
import { GetCatsQuery } from '../generated/graphql';

const CATS_QUERY = gql`
  query GetCats {
    cats: cat(limit: 10) {
      id
      name
      age
      type
    }
  }
`;

function CatList() {
  const { loading, error, data } = useQuery<GetCatsQuery>(CATS_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return <div>No data!</div>;
  return data;
}

export default function Home() {
  return <Common menuKey={MenuItem.Dashboard} data={CatList()} />;
}
