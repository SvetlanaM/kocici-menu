import Link from 'next/link';
import { BackLinkType } from '../utils/backlinks';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

const AddCatBox = ({ backlink }: { backlink: BackLinkType }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Link
      href={{
        pathname: '/my-cats/new-cat',
        query: { backlink: backlink },
      }}
    >
      <a>
        <div
          className={`relative mb-8 xl-custom:mb-0 ${
            backlink.includes('/my-cats/new-cat') ? 'h-full' : 'h-24'
          }`}
        >
          <div className="flex items-center h-full xxl-custom:pt-9 xxl-custom:pb-9 pl-4 border-rounded-base border-yellow bg-yellow-light add-cat hover:bg-yellow-lightest">
            <span className="w-3/6 xl-custom:w-4/6 xxl-custom:w-4/6 text-normal leading-tight font-semibold text-yellow-dark break-words">
              {t(cs['add_cat'])}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AddCatBox;
