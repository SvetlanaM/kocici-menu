type ContainerProps = {
  children: React.ReactNode;
};

const CenterContainer = ({ children }: ContainerProps) => {
  return (
    <div className="w-full xl-custom:w-9/12 mt-16 xl-custom:mt-0">
      {children}
    </div>
  );
};

export default CenterContainer;
