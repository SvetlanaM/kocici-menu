type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <div className="flex w-full h-screen">{children}</div>;
};

export default AuthWrapper;