import Image from './Image';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
const NoReviews = () => {
  const { t } = useTranslation();
  return (
    <div className="border-rounded-base border-gray">
      <div className="flex flex-col justify-between items-center px-8 pt-5 pb-4">
        <Image src="/icons/no-reviews.svg" width={150} />
        <h1 className="font-semibold text-gray mt-4">
          {t(sk['no_reviews_products'])}
        </h1>
      </div>
    </div>
  );
};

export default NoReviews;
