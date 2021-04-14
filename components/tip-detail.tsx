import { gql } from '@apollo/client';
import Title from './title';
import { TipDetailFragmentFragment } from '../graphql/generated/graphql';
import { TipFieldsFragment } from '../components/tip-box';
import router from 'next/router';
import Header from '../components/head';
import getTitle from '../utils/get-title';
import DateFormatObject from '../utils/get-format-date';

export const TipDetailFieldsFragment = gql`
  fragment TipDetailFragment on Tip {
    ...TipFieldsFragment
    description
    updated_at
  }
  ${TipFieldsFragment}
`;

const TipDetailBox = ({
  name,
  updated_at,
  description,
}: TipDetailFragmentFragment) => {
  const formattedDate = DateFormatObject(updated_at).formatDate();

  return (
    <>
      <Header title={getTitle(name)} />
      <div>
        <Title title={name} />
        <p className="text-sm font-light text-gray">
          Publikované: {formattedDate}
        </p>
        <div
          className="py-5 font-light text-purple leading-normal"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
        <button
          onClick={() => router.back()}
          className="text-purple font-medium"
        >
          {'< Speť'}
        </button>
      </div>
    </>
  );
};

export default TipDetailBox;
