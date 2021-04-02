type ContainerProps = {
  children: React.ReactNode;
  flexType: string;
};

const InnerContainer = ({ children, flexType }: ContainerProps) => {
  return <section className={`flex ${flexType} mt-9.5`}>{children}</section>;
};

export default InnerContainer;
