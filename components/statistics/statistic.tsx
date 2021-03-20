const StatisticSection = ({ icon, title, desc }) => {
  return (
    <div className="row w-full lg:w-1/2 pr-0">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default StatisticSection;
