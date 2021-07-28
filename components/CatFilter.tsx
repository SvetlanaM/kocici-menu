import { useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';
import Title from './Title';
import { GetCatDetailQuery } from '../graphql/generated/graphql';

interface CatFilterProps {
  cats: GetCatDetailQuery['cat'];
  setCatFunction: (id: number) => number;
  selectedCat: number;
}

const CatFilter = ({ cats, setCatFunction, selectedCat }: CatFilterProps) => {
  const [catId, setCatId] = useState<number>(cats[0].id);

  useEffect(() => {
    setCatFunction(cats[0].id);
  }, [cats]);

  // useEffect(() => {
  //   setCatFunction(catId);
  // }, [selectedCat]);

  const ref = useRef(null);
  useEffect(() => {
    console.log('ref', ref.current ? ref.current.scrollWidth : 0);
  }, [ref.current]);

  const ref2 = useRef(null);
  useEffect(() => {
    console.log('ref2', ref2.current ? ref2.current.scrollWidth : 0);
  }, [ref2.current]);

  return (
    <div className="flex align-baseline w-full" ref={ref2}>
      <Title title="Vybraná mačka: " classNames="flex-auto" />

      <ul
        className="flex flex-row ml-3 text-lg font-semibold cursor-pointer overflow-y-auto custom-scroll"
        style={{ width: String(ref) }}
        ref={ref}
      >
        {cats &&
          cats.map((cat) => {
            return (
              <li
                key={cat.id}
                className={
                  cat.id === selectedCat
                    ? 'text-purple mr-3 flex-auto'
                    : 'text-gray mr-3 flex-auto'
                }
                onClick={() => {
                  setCatFunction(cat.id);
                  setCatId(cat.id);
                }}
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
