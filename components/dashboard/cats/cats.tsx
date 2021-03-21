import CatSection from './cat';

const CatsSection = ({ data, rows }) => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      <CatSection
        photo={data.photo}
        name={data.name}
        age={data.age}
        type={data.type}
      />
      <CatSection
        photo={data.photo}
        name={data.name}
        age={data.age}
        type={data.type}
      />
    </div>
  );
};

export default CatsSection;
