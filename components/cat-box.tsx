import { gql } from '@apollo/client';
import Image from '../components/image';
import { useState } from 'react';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import { useTranslation } from 'next-i18next';
import CatToggleDetail from './cat-toggle-detail';
import { ARRAY_REQUIREMENTS_LENGTH as arrayLength } from '../utils/constants';
import sk from '../public/locales/sk/common.json';
import CatBasicInfo from './cat-basic-info';

export const CatFieldsFragment = gql`
  fragment CatFieldsFragment on Cat {
    age
    id
    image_url
    name
    type
    doctor_email
    color
    daily_food
    weight
    nickname
    specials: SpecialRequirements {
      name
    }
    reviews: Reviews(order_by: { updated_at: desc, review_type: desc })
      @include(if: $withProducts) {
      products: Product {
        brand_type
        id
        name
        image_url
        reviewhistory(order_by: { updated_at: desc }) {
          review_type
          cat_id
          updated_at
        }
      }
    }
  }
`;

interface CatBoxProps {
  CatFieldsFragment: CatFieldsFragmentFragment;
  reviews: CatFieldsFragmentFragment['reviews'];
}

const CatBox = ({ CatFieldsFragment, reviews }: CatBoxProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSlider = () => setIsOpen(!isOpen);

  const arrayDiff = CatFieldsFragment.specials.length - arrayLength;
  const updatedSpecials =
    CatFieldsFragment.specials.length > arrayLength
      ? [
          ...CatFieldsFragment.specials.slice(0, arrayLength),
          {
            name: `... ${t(sk.next_count.key, {
              count: arrayDiff,
            })} ${arrayDiff} ${t(sk.requirements_count.key, {
              count: arrayDiff,
            })}`,
          },
        ]
      : CatFieldsFragment.specials;

  const catData = {
    doctor_email: CatFieldsFragment.doctor_email,
    specials: updatedSpecials,
  };

  console.log(catData);
  return (
    <div className="flex flex-col flex-no-wrap justify-between h-75 py-3 border-rounded-base border-gray small-purple-text text-left my-cat">
      <div className="flex flex-row px-3">
        <CatBasicInfo cat={CatFieldsFragment} />
        {(catData.doctor_email !== null || catData.specials.length > 0) && (
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
