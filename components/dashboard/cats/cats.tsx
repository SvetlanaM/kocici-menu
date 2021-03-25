import CatSection, { fragments } from './cat';

export const fragment = fragments;
const CatsSection = ({ cats, rows }) => {
  return (
    <div className={`grid ${rows} gap-y-5 mt-7`}>
      {cats && cats.map((cat) => <CatSection key={cat.id} cat={cat} />)}
    </div>
  );
};

export default CatsSection;
