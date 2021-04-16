import { GetCatsQuery } from '../graphql/generated/graphql';
import CatBox from './cat-box';
import { gql } from '@apollo/client';

interface CatSectionProps {
  cats: GetCatsQuery['cats'];
  rows: string;
}

const CatsList = ({ cats, rows }: CatSectionProps) => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      {cats &&
        cats.map((cat) => (
          <CatBox key={cat.id} CatFieldsFragment={cat} reviews={cat.reviews} />
        ))}
    </div>
  );
};

export default CatsList;
