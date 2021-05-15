import Title from '../components/title';

const CatFilter = (cats: Array<string>) => {
  return (
    <div className="flex align-baseline">
      <Title title="Vybrana macka: " />
      <ul className="flex flex-row ml-3 text-lg font-semibold text-purple">
        <li className="mr-3">Stacy</li>
        <li>Oberyn</li>
      </ul>
    </div>
  );
};

export default CatFilter;
