import Image from '../components/image';
import { GetUserStatsQuery } from '../graphql/generated/graphql';
import { useTranslation } from 'next-i18next';
import i18next from 'i18next';
import setUppercaseTitle from '../utils/set-uppercase-title';

interface UserBannerProps {
  data: GetUserStatsQuery;
}

const getUsername = (email: string): string => {
  return email.substr(0, email.lastIndexOf('@'));
};

i18next.init({
  lng: 'sk',
  debug: false,
  resources: {
    sk: {
      translation: {
        reviews: {
          key_0: '{{count}} hodnotenie',
          key_1: '{{count}} hodnotenia',
          key_2: '{{count}} hodnotení',
        },
        products: {
          key_0: 'produktu',
          key_1: 'produkty',
          key_2: 'produktov',
        },
      },
    },
  },
});

const UserBanner = ({ data }: UserBannerProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex pt-4 pb-2 pr-10 bg-gray-light border-rounded-base border-gray_lightest">
      <div className="mb-5 mt-3 ml-6 leading-tight">
        <h4 className="mb-3 text-purple font-medium text-2xl">
          Čauky mňauky,{' '}
          {setUppercaseTitle(getUsername(data.user_data[0].email))}!
        </h4>
        <div className="flex justify-between items-center">
          <p className="small-purple-text font-light text-sm pr-4">
            Za posledných 7 dní si pridal/a{' '}
            {i18next.t('reviews.key', {
              count: data.reviews_count.aggregate.count,
            })}{' '}
            {i18next.t('products.key', {
              count: data.reviews_count.aggregate.count,
            })}
            . Tvoja obľúbená značka je{' '}
            <strong>{data.stats[0].brand_type}</strong> s priemerným hodnotením
            všetkých produktov <strong>{data.user_stats[0].avg_review}</strong>.
            <br />
            <p className="mt-5">
              <strong>Novinka mesiaca: Applaws kurací vývar</strong>
            </p>
          </p>
          <Image
            src="/icons/user-profile-cat.svg"
            className="pr-5"
            width={130}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
