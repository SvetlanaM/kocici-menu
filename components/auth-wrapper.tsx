type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <div className="flex w-full justify-items-stretch">{children}</div>;
};

export default AuthWrapper;
