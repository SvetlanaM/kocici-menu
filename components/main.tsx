import dynamic from 'next/dynamic';

const Main = ({ name }): JSX.Element => {
  const DynamicComponent = dynamic(() => import(`${name}`));

  return (
    <div className="pt-9.5 p-8 w-full overflow-x-hidden border-t flex flex-col">
      <DynamicComponent />
    </div>
  );
};

export default Main;
