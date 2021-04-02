type ContainerProps = {
  children: React.ReactNode;
};

const CenterContainer = ({ children }: ContainerProps) => {
  return <div className="w-9/12">{children}</div>;
};

export default CenterContainer;
