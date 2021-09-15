import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { GetUserStatsQuery } from '../graphql/generated/graphql';
import DateFormatObject from '../utils/getFormatDate';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface UserStatsProps {
  data: GetUserStatsQuery;
}

export const UserStatsFieldFragment = gql`
  fragment UserStatsFieldFragment on user_stats {
    count_of_cats
    count_of_reviews
    avg_review
    id
  }
`;

export const UserFieldFragment = gql`
  fragment UserFieldFragment on User {
    email
    created_at
    prefered_eshop
    id
  }
`;

const UserStats = ({ data }: UserStatsProps) => {
  const { t } = useTranslation();
  const userDataObject = useMemo(() => {
    return (
      (data && [
        {
          labels: t(cs['email']),
          data_values: data.user_data[0].email || '--',
        },
        {
          labels: t(cs['registration_date']),
          data_values:
            DateFormatObject(data.user_data[0].created_at).formatDateTime() ||
            '--',
        },
      ]) ||
      []
    );
  }, [data]);

  const userStatsObject = useMemo(() => {
    return (
      (data && [
        {
          labels: t(cs['num_of_cats']),
          data_values:
            (data.user_stats[0] && data.user_stats[0].count_of_cats) || '--',
        },
        {
          labels: t(cs['num_of_reviews']),
          data_values:
            (data.user_stats[0] && data.user_stats[0].count_of_reviews) || '--',
        },
        {
          labels: t(cs['my_eshop']),
          data_values: data.user_data[0].prefered_eshop || 'Zoohit',
        },
      ]) ||
      []
    );
  }, [data]);

  const mergedObject = useMemo(() => {
    return [userDataObject, userStatsObject];
  }, [data]);

  return (
    <div className="border-rounded-base border-gray">
      <div className="grid divide-y divide-gray_lightest">
        {mergedObject.map((item, index) => {
          return (
            <div className="pt-1 flex justify-between items-center" key={index}>
              <div className="w-full px-5 pb-2 pt-4">
                <ul className="small-light-text">
                  {item.map((item, index) => (
                    <li key={index} className="mb-4">
                      {String(item.data_values).length < 3 ? (
                        <p className="text-gray">
                          {item.labels}:{' '}
                          <span className="text-purple">
                            {item.data_values}
                          </span>
                        </p>
                      ) : (
                        <>
                          <p className="text-gray">{item.labels}</p>
                          <p className="text-purple mt-1">{item.data_values}</p>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserStats;
