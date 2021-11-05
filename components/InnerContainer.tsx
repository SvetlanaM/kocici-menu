type ContainerProps = {
  children: React.ReactNode;
  flexType: string;
};

const InnerContainer = ({
  children,
  flexType,
}: ContainerProps): JSX.Element => {
  return (
    <section
      className={`flex ${flexType} mt-8 xl-custom:mt-9.5 md:mt-5 w-full`}
    >
      {children}
    </section>
  );
};

export default InnerContainer;
