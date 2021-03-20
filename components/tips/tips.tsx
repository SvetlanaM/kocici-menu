import TipSection from './tip';

const TipsSection = ({ data }) => {
  return (
    <div>
      <TipSection title={data.title} link={data.link} />
      <div>icon</div>
    </div>
  );
};

export default TipsSection;
