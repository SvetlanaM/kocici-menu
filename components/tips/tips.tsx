import TipSection from './tip';

const TipsSection = ({ data, cols }) => {
  return (
    <div className={`grid ${cols} grid-flow-row gap-x-11`}>
      <TipSection title={data.title} link={data.link} />
      <TipSection title={data.title} link={data.link} />
      <TipSection title={data.title} link={data.link} />
      <TipSection title={data.title} link={data.link} />
    </div>
  );
};

export default TipsSection;
