import { gql } from '@apollo/client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import { useTranslation } from 'next-i18next';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';

export const CatFieldsFragment = gql`
  fragment CatFieldsFragment on Cat {
    age
    id
    image_url
    name
    type
    slug
  }
`;

const CatBox = ({ name, type, age, image_url }: CatFieldsFragmentFragment) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSlider = () => setIsOpen(!isOpen);

  // toto je tu uplne zbytocne teraz
  const catImage = useMemo<string>(
    () => (image_url ? image_url : defaultImage),
    [image_url]
  );

  return (
    <div className="flex justify-between h-75 py-3 px-3 border-rounded-base border-gray small-purple-text text-left my-cat">
      <div className="flex flex-row">
        <Image
          alt={name}
          src={catImage}
          width={65}
          height={65}
          className="border-rounded-base"
        />
        <div className="flex-col-base justify-between ml-3">
          <h4>{name}</h4>
          <p className="small-light-text">{type}</p>
          <p className="small-light-text text-gray">
            {age ? t('years.key', { count: age }) : '--'}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleSlider}
          aria-haspopup
          aria-expanded={isOpen}
          id={name}
        >
          <Image src="/icons/down.svg" height={8} width={15} quality={100} />
        </button>
        {isOpen ? <div aria-labelledby={name}></div> : null}
      </div>
    </div>
  );
};

export default CatBox;
