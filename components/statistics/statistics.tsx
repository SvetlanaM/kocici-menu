import StatisticSection from './statistic';

const StatisticsSection = ({ data }) => {
  return (
    <div className="row">
      <div className="column">
        <StatisticSection
          icon={data.icon}
          title={data.title}
          desc={data.desc}
        />
      </div>
    </div>
  );
};

export default StatisticsSection;
