type AuthLeftContainerProps = {
  children: React.ReactNode;
  className: string;
};

const AuthLeftContainer = ({ children, className }: AuthLeftContainerProps) => {
  return (
    <div className={`w-1/2 bg-purple-darkest ${className}`}>{children}</div>
  );
};

export default AuthLeftContainer;
