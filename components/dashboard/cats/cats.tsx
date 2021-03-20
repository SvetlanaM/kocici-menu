import CatSection from './cat';

const CatsSection = ({ data }) => {
  return (
    <div className="w-full lg:w-1/2 pr-0">
      <div className="p-6 bg-white">
        <CatSection name={data.name} />
      </div>
    </div>
  );
};

export default CatsSection;
