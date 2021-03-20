import { useQuery, gql } from '@apollo/client';
import { GetCatsQuery } from '../generated/graphql';
import Common from '../components/common';

const CATS_QUERY = gql`
  query GetCats {
    cats: cat(limit: 10) {
      id
      name
      age
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
            {cat.name} : {cat.age}
          </p>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Common menuKey="dashboard" />
    </>
  );
}
