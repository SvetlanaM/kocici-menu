const Main = ({ name }): JSX.Element => {
  const ComponentPage = name;
  return (
    <div className="w-full flex-col-base pt-9.5 p-8 overflow-x-hidden">
      <ComponentPage />
    </div>
  );
};

export default Main;
