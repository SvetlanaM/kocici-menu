type ContainerProps = {
  children: React.ReactNode;
  flexType: string;
};

const InnerContainer = ({ children, flexType }: ContainerProps) => {
  return (
    <section className={`flex ${flexType} mt-9.5 w-full`}>{children}</section>
  );
};

export default InnerContainer;
