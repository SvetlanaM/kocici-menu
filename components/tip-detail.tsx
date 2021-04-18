import { gql } from '@apollo/client';
import Title from './title';
import { TipDetailFragmentFragment } from '../graphql/generated/graphql';
import { TipFieldsFragment } from '../components/tip-box';
import router from 'next/router';
import DateFormatObject from '../utils/get-format-date';
import BackButton from '../components/back-button';
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
    <div className="text-justify">
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
      <BackButton url={'/'} />
    </div>
  );
};

export default TipDetailBox;
