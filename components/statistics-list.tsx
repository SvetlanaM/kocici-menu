import StatisticBox from './statistic-box';
import InnerContainer from './inner-container';

interface StatisticsListProps {
  data: Array<any>;
  cols: string;
}

const StatisticsList = ({ data, cols }: StatisticsListProps) => {
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
