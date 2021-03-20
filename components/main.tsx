import dynamic from 'next/dynamic';

const Main = ({ name }): JSX.Element => {
  const DynamicComponent = dynamic(() => import(`${name}`));

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap mt-6 p-6 flex-shrink">
        <DynamicComponent />
      </div>
    </div>
  );
};

export default Main;
