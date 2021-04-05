import { GetCatsQuery } from '../graphql/generated/graphql';
import CatSection from './cat-box';

interface CatSectionProps {
  cats: GetCatsQuery['cats'];
  rows: string;
}
const CatsList = ({ cats, rows }: CatSectionProps) => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      {cats &&
        cats.map((cat) => (
          <CatSection
            key={cat.id}
            CatFieldsFragment={cat}
            reviews={cat.reviews}
          />
        ))}
    </div>
  );
};

export default CatsList;
