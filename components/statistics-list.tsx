import StatisticSection from './statistic-box';
import InnerContainer from './inner-container';

const StatisticsList = ({ data, cols }) => {
  return (
    <InnerContainer flexType="flew-col">
      {/* tu bude nejaky cyklus a if na parne/neparne */}

      <div className={`grid ${cols} grid-flow-row gap-x-11 w-full`}>
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
    </InnerContainer>
  );
};

export default StatisticsList;
