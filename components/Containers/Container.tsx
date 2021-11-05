type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div className="w-full flex-col-base pt-20 xl-custom:pt-5 xl-custom:pt-9.5 p-8 xl-custom:p-8 overflow-x-hidden">
        <div className="flex flex-wrap">{children}</div>
      </div>
    </div>
  );
};

export default Container;
