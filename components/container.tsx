type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div className="w-full flex-col-base pt-9.5 p-8 overflow-x-hidden">
        <div className="container flex flex-wrap">{children}</div>
      </div>
    </div>
  );
};

export default Container;
