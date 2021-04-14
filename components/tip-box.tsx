import Link from 'next/link';
import { gql } from '@apollo/client';
import { TipFieldsFragmentFragment } from '../graphql/generated/graphql';

export const TipFieldsFragment = gql`
  fragment TipFieldsFragment on Tip {
    id
    name
    slug
  }
`;

const TipBox = ({ name, slug }: TipFieldsFragmentFragment) => {
  return (
    <div className="w-full pb-3.6 mb-4 border-b border-gray">
      <Link href={`/tips/${encodeURIComponent(slug)}`}>
        <a className="small-purple-text font-light more-info">{name}</a>
      </Link>
    </div>
  );
};

export default TipBox;
