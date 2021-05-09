type AuthLeftContainerProps = {
  children: React.ReactNode;
  className: string;
};

const AuthLeftContainer = ({ children, className }: AuthLeftContainerProps) => {
  return (
    <div className={`w-1/2 bg-purple-darkest ${className} min-h-screen`}>
      {children}
    </div>
  );
};

export default AuthLeftContainer;
