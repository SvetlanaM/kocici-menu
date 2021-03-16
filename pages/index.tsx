import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import { GetCatsQuery } from '../generated/graphql';

const CATS_QUERY = gql`
  query GetCats {
    cats: cat {
      id
      name
    }
  }
`;

function CatList() {
  const { loading, error, data } = useQuery<GetCatsQuery>(CATS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      {data.cats.map((cat) => (
        <div key={cat.id}>
          <p>
            {cat.name} : {cat.__typename}
          </p>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div>
      <CatList></CatList>
    </div>
  );
}
