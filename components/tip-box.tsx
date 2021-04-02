import Link from 'next/link';
import { gql } from '@apollo/client';
import { TipFieldsFragmentFragment } from '../graphql/generated/graphql';

export const TipFieldsFragment = gql`
  fragment TipFieldsFragment on Tip {
    id
    name
  }
`;

const TipBox = ({ name }: TipFieldsFragmentFragment) => {
  return (
    <div className="w-full pb-3.6 mb-4 border-b border-gray">
      <Link href="/">
        <a className="small-purple-text font-light more-info">{name}</a>
      </Link>
    </div>
  );
};

export default TipBox;
