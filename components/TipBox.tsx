import Link from 'next/link';
import { gql } from '@apollo/client';
import { TipFieldsFragmentFragment } from '../graphql/generated/graphql';
import Image from './Image';
import { BackLinkType } from '../utils/backlinks';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

export const TipFieldsFragment = gql`
  fragment TipFieldsFragment on Tip {
    id
    name
    slug
    category: category_value {
      comment
    }
    perex
    description
    created_at
  }
`;

interface TipBoxInterface {
  name: TipFieldsFragmentFragment['name'];
  slug: TipFieldsFragmentFragment['slug'];
  category_machine_name?: string;
  order?: string;
  isOnDashboard: boolean;
  readingTime?: number;
}

const TipBox = ({
  name,
  slug,
  category_machine_name,
  order,
  isOnDashboard,
  readingTime,
}: TipBoxInterface): JSX.Element => {
  const backlink = isOnDashboard ? BackLinkType.DASHBOARD : BackLinkType.TIPS;
  const { t } = useTranslation();
  return (
    <div className="w-full pb-3.6 mb-4 border-b border-gray tips-list">
      <Link
        href={{
          pathname: `/tips/${slug}`,
          query: { backlink: backlink },
        }}
      >
        <a className="small-purple-text font-light flex flex-row items-center justify-between">
          <div>
            {!isOnDashboard ? (
              <Image
                src={`/icons/${category_machine_name}.svg`}
                height={20}
                className="mr-4 xl-custom:inline hidden"
              />
            ) : (
              order
            )}
            {name}
          </div>
          <div>
            {!isOnDashboard ? (
              <span className="mr-3 hidden xl-custom:flex flex-row mt-1 text-purple">
                <Image
                  src={`/icons/clock.svg`}
                  height={10}
                  width={15}
                  className="mr-2 inline-block"
                />
                {readingTime} {t(cs['reading_time'])}
                <Image
                  src={`/icons/more.svg`}
                  height={10}
                  width={8}
                  className="ml-3 inline-block"
                />
              </span>
            ) : (
              <Image
                src={`/icons/more.svg`}
                height={10}
                width={8}
                className="ml-3 inline-block"
              />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default TipBox;
