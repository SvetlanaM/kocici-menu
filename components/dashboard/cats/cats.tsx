import CatSection from './cat';

const CatsSection = ({ cats, rows }) => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      {cats &&
        cats.map((cat) => (
          <CatSection
            key={cat.id}
            photo={cat.photo}
            name={cat.name}
            age={cat.age}
            type={cat.type}
          />
        ))}
    </div>
  );
};

export default CatsSection;
