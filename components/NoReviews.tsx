import Image from './Image';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import Link from 'next/link';

const NoReviews = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="border-rounded-base border-gray">
      <div className="flex flex-col justify-between items-center px-8 pt-5 pb-4">
        <Image src="/icons/no-reviews.svg" width={150} />
        <h1 className="font-semibold text-gray mt-4">
          {t(cs['no_reviews_products'])}{' '}
          <Link href={'/my-cats'}>
            <a className="hover:text-purple-light">
              {t(cs['add_first_review'])}
            </a>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default NoReviews;
