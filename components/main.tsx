const Main = ({ name, data }): JSX.Element => {
  const ComponentPage = name;
  return (
    <div className="w-full flex-col-base pt-9.5 p-8 overflow-x-hidden">
      <ComponentPage data={data} />
    </div>
  );
};

export default Main;
