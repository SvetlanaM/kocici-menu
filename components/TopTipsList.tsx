import Image from './Image';
import Link from 'next/link';
import cs from '../public/locales/cs/common.json';
import { useTranslation } from 'react-i18next';
import { BackLinkType } from '../utils/backlinks';

interface TopTipsListProps {
  data: {
    name: string;
    icon: string;
    title: string;
    category: string;
    slug: string;
  }[];
  cols: string;
}

const TopTipsList = ({ data, cols }: TopTipsListProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div
      className={`grid ${cols} gap-y-8 xl-custom:gap-x-11 pt-8 xl-custom:pt-0`}
    >
      {data &&
        data.map((item) => (
          <Link
            key={item.name + item.title}
            href={{
              pathname: `/tips/${item.slug}`,
              query: { backlink: BackLinkType.TIPS },
            }}
          >
            <a>
              <div className="flex pt-4 pr-10 bg-gray-light border-rounded-base border-gray_lightest h-full hover:bg-gray-lightest">
                <Image
                  src={item.icon}
                  className="mt-auto mr-auto hidden xl-custom:block ml-3"
                  height={200}
                />

                <div className="flex-col-base justify-evenly mb-5 mt-3 ml-6 leading-tight">
                  <h4 className="mb-3 text-purple font-medium text-1xl">
                    {item.title}
                  </h4>
                  <p className="small-purple-text font-light text-sm">
                    {item.name}
                    <span className="text-purple-light block mt-3">
                      {t(cs[item.category])}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default TopTipsList;
