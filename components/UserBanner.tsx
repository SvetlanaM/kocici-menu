import Image from './Image';
import { GetUserStatsQuery } from '../graphql/generated/graphql';
import { useTranslation } from 'next-i18next';
import i18next from 'i18next';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import { getUsername } from '../utils/getUsername';

interface UserBannerProps {
  data: GetUserStatsQuery;
}

const UserBanner = ({ data }: UserBannerProps) => {
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

  const { t } = useTranslation();
  return (
    <div className="flex pt-4 pb-2 pr-10 bg-gray-light border-rounded-base border-gray_lightest">
      <div className="mb-5 mt-3 ml-6 leading-tight">
        <h4 className="mb-3 text-purple font-medium text-2xl">
          Čauky mňauky, {getUsername(data.user_data[0].email)}!
        </h4>
        <div className="flex flex-col xl-custom:flex-row justify-between items-center">
          <p className="small-purple-text font-light text-sm pr-4">
            Za posledných 7 dní si pridal/a{' '}
            {i18next.t('reviews.key', {
              count: data.reviews_count.aggregate.count,
            })}
            .{' '}
            {data.stats[0] ? (
              <span>
                Tvoja obľúbená značka je{' '}
                <strong>{data.stats[0] && data.stats[0].brand_type}</strong>.
                Priemerné hodnotenie všetkých produktov je{' '}
                <strong>{data.user_stats[0].avg_review}</strong>.
                <br />
              </span>
            ) : (
              <span>
                Pre zobrazenie štatistík pridaj prvé hodnotenie produktu.
                <br />
              </span>
            )}
            <p className="mt-5">
              <strong>
                Novinka mesiaca: My Star is a Food Lover - smíšené balení
              </strong>
            </p>
          </p>
          <Image
            src="/icons/user-profile-cat.svg"
            className="pr-5 mt-5 xl-custom:mt-0"
            width={130}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
