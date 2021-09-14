import Link from 'next/link';
import { BackLinkType } from '../utils/backlinks';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

const AddCatBox = ({ backlink }: { backlink: BackLinkType }) => {
  const { t } = useTranslation();
  return (
    <Link
      href={{
        pathname: '/my-cats/new-cat',
        query: { backlink: backlink },
      }}
    >
      <a>
        <div className="relative">
          <div className="flex pt-6 pb-6 xxl-custom:pt-9 xxl-custom:pb-9 pl-4 border-rounded-base border-yellow bg-yellow-light add-cat hover:bg-yellow-lightest">
            <span className="w-4/6 text-normal leading-tight font-semibold text-yellow-dark break-words">
              {t(sk['add_cat'])}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AddCatBox;
