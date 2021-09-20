import StatisticBox from './StatisticBox';
import InnerContainer from './InnerContainer';
import { GetDashboardQuery } from '../graphql/generated/graphql';

interface StatisticsListProps {
  data: GetDashboardQuery['fav_stats'] | GetDashboardQuery['stats'];
  cols: string;
}

const StatisticsList = ({ data, cols }: StatisticsListProps): JSX.Element => {
  return (
    <InnerContainer flexType="flew-col">
      <div
        className={`grid grid-cols xl-custom:${cols} grid-flow-row gap-y-11 xl-custom:gap-x-11 w-full`}
      >
        {data &&
          data.map((item) => (
            <StatisticBox
              key={item.name + item.title}
              icon={item.icon}
              name={item.name}
              title={item.title}
            />
          ))}
      </div>
    </InnerContainer>
  );
};

export default StatisticsList;
