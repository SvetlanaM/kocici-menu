import { GetCatsQuery } from '../graphql/generated/graphql';
import CatBox from './CatBox';

interface CatSectionProps {
  cats: GetCatsQuery['cats'];
  rows: string;
}

const CatsList = ({ cats, rows }: CatSectionProps): JSX.Element => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      {cats &&
        cats.map((cat) => (
          <CatBox
            key={cat.id}
            CatFieldsFragmentMain={cat}
            reviews={cat.reviews}
          />
        ))}
    </div>
  );
};

export default CatsList;
