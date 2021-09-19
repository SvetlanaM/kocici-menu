import { gql } from '@apollo/client';
import Image from './Image';
import { useState } from 'react';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import CatToggleDetail from './CatToggleDetail';
import CatBasicInfo from './CatBasicInfo';
import DateFormatObject from '../utils/getFormatDate';

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
    gender
    note
    slug
    year_date
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
        path
        analysis_main
        analysis_variant
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
  CatFieldsFragmentMain: CatFieldsFragmentFragment;
  reviews: CatFieldsFragmentFragment['reviews'];
}

const CatBox = ({ CatFieldsFragmentMain }: CatBoxProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSlider = () => setIsOpen(!isOpen);

  const catData = {
    contact_doctor: {
      email: CatFieldsFragmentMain.doctor_email,
      age: DateFormatObject().getCatAge(CatFieldsFragmentMain.year_date),
      weight: CatFieldsFragmentMain.weight,
      name: CatFieldsFragmentMain.name,
      gender: CatFieldsFragmentMain.gender,
    },
    specials: CatFieldsFragmentMain.note,
  };

  return (
    <div className="flex flex-col flex-no-wrap justify-between h-75 py-3 border-rounded-base border-gray small-purple-text text-left my-cat">
      <div className="flex flex-row px-3">
        <CatBasicInfo cat={CatFieldsFragmentMain} />
        {(catData.specials || catData.contact_doctor.email) && (
          <button
            type="button"
            onClick={toggleSlider}
            aria-haspopup
            aria-expanded={isOpen}
            id={CatFieldsFragmentMain.name}
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
        <div aria-labelledby={CatFieldsFragmentMain.name}>
          <CatToggleDetail catData={catData} />
        </div>
      ) : null}
    </div>
  );
};

export default CatBox;
