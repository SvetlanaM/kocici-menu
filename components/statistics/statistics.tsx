import StatisticSection from './statistic';

const StatisticsSection = ({ data, cols }) => {
  return (
    <>
      {/* tu bude nejaky cyklus a if na parne/neparne */}

      <div className={`grid ${cols} gap-col-11`}>
        <StatisticSection
          icon={data.icon}
          title={data.title}
          desc={data.desc}
        />

        <StatisticSection
          icon={data.icon}
          title={data.title}
          desc={data.desc}
        />
      </div>
    </>
  );
};

export default StatisticsSection;
