import { useEffect } from 'react';
import Title from '../components/title';
import { GetCatDetailQuery } from '../graphql/generated/graphql';

interface CatFilterProps {
  cats: GetCatDetailQuery['cat'];
  setCatFunction: (id: number) => number;
  selectedCat: number;
}

const CatFilter = ({ cats, setCatFunction, selectedCat }: CatFilterProps) => {
  useEffect(() => {
    setCatFunction(cats[0].id);
  }, [cats]);

  return (
    <div className="flex align-baseline">
      <Title title="Vybraná mačka: " />
      <ul className="flex flex-row ml-3 text-lg font-semibold cursor-pointer">
        {cats &&
          cats.map((cat) => {
            return (
              <li
                key={cat.id}
                className={
                  cat.id === selectedCat ? 'text-purple mr-3' : 'text-gray mr-3'
                }
                onClick={() => setCatFunction(cat.id)}
              >
                {cat.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CatFilter;
