import dynamic from 'next/dynamic';

const Main = ({ name }): JSX.Element => {
  const DynamicComponent = dynamic(() => import(`${name}`));

  return (
    <div className="w-full flex-col-base pt-9.5 p-8 overflow-x-hidden">
      <DynamicComponent />
    </div>
  );
};

export default Main;
