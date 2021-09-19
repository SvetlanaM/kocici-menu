type AuthLeftContainerProps = {
  children: React.ReactNode;
  className: string;
};

const AuthLeftContainer = ({
  children,
  className,
}: AuthLeftContainerProps): JSX.Element => {
  return (
    <div
      className={`order-1 xl-custom:order-2 w-full xl-custom:w-1/2 bg-purple-darkest ${className}`}
    >
      {children}
    </div>
  );
};

export default AuthLeftContainer;
