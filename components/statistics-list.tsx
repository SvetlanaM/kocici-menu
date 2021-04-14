import StatisticBox from './statistic-box';
import InnerContainer from './inner-container';
import { GetDashboardQuery } from '../graphql/generated/graphql';

const StatisticsList = ({ data, cols }) => {
  console.log(data);
  return (
    <InnerContainer flexType="flew-col">
      <div className={`grid ${cols} grid-flow-row gap-x-11 w-full`}>
        {data &&
          data.map((item) => (
            <StatisticBox
              key={item.name}
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
