interface ContainerProps {
  children: React.ReactNode;
}

const LeftContainer = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="w-full pt-5 xl-custom:pt-0 xl-custom:w-3/12 xl-custom:pl-7">
      {children}
    </div>
  );
};

export default LeftContainer;
