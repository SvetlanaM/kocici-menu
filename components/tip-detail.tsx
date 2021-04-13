import { gql } from '@apollo/client';
import Title from './title';
import { TipDetailFragmentFragment } from '../graphql/generated/graphql';
import { TipFieldsFragment } from '../components/tip-box';
import router from 'next/router';

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
  return (
    <div>
      <Title title={name} />
      <p>{updated_at}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
      <div onClick={() => router.back()}>Go Back</div>
    </div>
  );
};

export default TipDetailBox;
