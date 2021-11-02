import { useRef } from 'react';
import { useEffect, useState } from 'react';
import Title from '../Title';
import { GetCatDetailQuery } from '../../graphql/generated/graphql';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import truncateText from '../../utils/truncateText';

interface CatFilterProps {
  cats: GetCatDetailQuery['cat'];
  setCatFunction: (id: number) => number;
  selectedCat: number;
}

const CatFilter = ({
  cats,
  setCatFunction,
  selectedCat,
}: CatFilterProps): JSX.Element => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [catId, setCatId] = useState<number>(selectedCat);

  useEffect(() => {
    let newCatId = catId;
    if (!cats.some((cat) => cat.id === catId)) {
      newCatId = cats[0].id;
    }
    setCatId(newCatId);
    setCatFunction(newCatId);
  }, [cats]);

  return (
    <div className="flex align-baseline w-full" ref={ref2}>
      <Title title={`${t(cs['choosen_cat'])}:`} classNames="flex-auto" />
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
                    : 'text-gray mr-3 flex-auto hover:text-purple-light'
                }
                onClick={() => {
                  setCatFunction(cat.id);
                  setCatId(cat.id);
                }}
              >
                {truncateText(cat.name, 20)}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CatFilter;
