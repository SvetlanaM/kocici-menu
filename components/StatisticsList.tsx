import StatisticBox from './StatisticBox';
import InnerContainer from './InnerContainer';

interface StatisticsListProps {
  data: Array<any>;
  cols: string;
}

const StatisticsList = ({ data, cols }: StatisticsListProps) => {
  return (
    <InnerContainer flexType="flew-col">
      <div
        className={`grid grid-cols xl-custom:${cols} grid-flow-row gap-y-11 xl-custom:gap-x-11 w-full`}
      >
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
