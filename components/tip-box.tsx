import Link from 'next/link';
import { gql } from '@apollo/client';
import { TipFieldsFragmentFragment } from '../graphql/generated/graphql';
import Image from './image';

export const TipFieldsFragment = gql`
  fragment TipFieldsFragment on Tip {
    id
    name
    slug
    category_machine_name
    category
    perex
  }
`;

interface TipBoxInterface {
  name: TipFieldsFragmentFragment['name'];
  slug: TipFieldsFragmentFragment['slug'];
  category_image?: string;
  category_machine_name?: string;
}

const TipBox = ({
  name,
  slug,
  category_image,
  category_machine_name,
}: TipBoxInterface) => {
  return (
    <div className="w-full pb-3.6 mb-4 border-b border-gray">
      <Link href={`/tips/${encodeURIComponent(slug)}`}>
        <a className="small-purple-text font-light more-info">
          {category_image && (
            <Image src={`/icons/${category_machine_name}`} height={20} />
          )}
          {name}
        </a>
      </Link>
    </div>
  );
};

export default TipBox;
