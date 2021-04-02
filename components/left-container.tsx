type ContainerProps = {
  children: React.ReactNode;
};

const LeftContainer = ({ children }: ContainerProps) => {
  return <div className="w-3/12 pl-7">{children}</div>;
};

export default LeftContainer;
