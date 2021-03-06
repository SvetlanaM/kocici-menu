type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps): JSX.Element => {
  return (
    <div className="flex flex-col xl-custom:flex-row w-full justify-items-stretch">
      {children}
    </div>
  );
};

export default AuthWrapper;
