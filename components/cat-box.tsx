import { gql } from '@apollo/client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import { useTranslation } from 'next-i18next';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import CatToggleDetail from './cat-toggle-detail';
import setUppercaseTitle from '../utils/set-uppercase-title';

export const CatFieldsFragment = gql`
  fragment CatFieldsFragment on Cat {
    age
    id
    image_url
    name
    type
    doctor_email
    specials: SpecialRequirements {
      name
    }
    reviews: Reviews(
      order_by: { review_type: desc, updated_at: desc }
      limit: 2
    ) @include(if: $withProducts) {
      products: Product {
        brand_type
        name
        image_url
      }
    }
  }
`;

interface CatBoxProps {
  CatFieldsFragment: CatFieldsFragmentFragment;
  reviews: CatFieldsFragmentFragment['reviews'];
}

const CatBox = ({ CatFieldsFragment, reviews }: CatBoxProps) => {
  let catProducts = [];
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSlider = () => setIsOpen(!isOpen);

  // toto je tu uplne zbytocne teraz
  const catImage = useMemo<string>(
    () =>
      CatFieldsFragment.image_url ? CatFieldsFragment.image_url : defaultImage,
    [CatFieldsFragment.image_url]
  );

  catProducts = Object.values(reviews!).map((review) => review.products);

  const updatedSpecials =
    CatFieldsFragment.specials.length > 3
      ? [
          ...CatFieldsFragment.specials.slice(0, 3),
          {
            name: `... ${t('next_count.key', {
              count: CatFieldsFragment.specials.length - 3,
            })} ${CatFieldsFragment.specials.length - 3} ${t(
              'requirements_count.key',
              {
                count: CatFieldsFragment.specials.length - 3,
              }
            )}`,
          },
        ]
      : CatFieldsFragment.specials;

  const catData = {
    reviews: catProducts,
    doctor_email: CatFieldsFragment.doctor_email,
    specials: updatedSpecials,
  };

  return (
    <div className="flex flex-col flex-no-wrap justify-between h-75 py-3 border-rounded-base border-gray small-purple-text text-left my-cat">
      <div className="flex flex-row px-3">
        <Image
          alt={setUppercaseTitle(CatFieldsFragment.name)}
          src={catImage}
          width={65}
          height={65}
          className="border-rounded-base"
        />
        <div className="flex-col-base justify-between ml-3">
          <h4>{CatFieldsFragment.name}</h4>
          <p className="small-light-text">
            {t(CatFieldsFragment.type || 'CAT_TYPE_NULL')}
          </p>
          <p className="small-light-text text-gray">
            {CatFieldsFragment.age
              ? t('years.key', { count: CatFieldsFragment.age })
              : '--'}
          </p>
        </div>
        {catData.doctor_email !== '' &&
          catData.reviews.length > 0 &&
          catData.specials.length > 0 && (
            <button
              type="button"
              onClick={toggleSlider}
              aria-haspopup
              aria-expanded={isOpen}
              id={CatFieldsFragment.name}
              className="focus:outline-none ml-auto"
            >
              {isOpen ? (
                <Image
                  src="/icons/down.svg"
                  height={8}
                  width={15}
                  quality={100}
                  className="transform rotate-180"
                />
              ) : (
                <Image
                  src="/icons/down.svg"
                  height={8}
                  width={15}
                  quality={100}
                />
              )}
            </button>
          )}
      </div>
      {isOpen ? (
        <div aria-labelledby={CatFieldsFragment.name}>
          <CatToggleDetail catData={catData} />
        </div>
      ) : null}
    </div>
  );
};

export default CatBox;
