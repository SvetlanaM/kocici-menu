type HomepageWrapperProps = {
  children: React.ReactNode;
};

const HomepageWrapper = ({ children }: HomepageWrapperProps): JSX.Element => {
  return <div className="flex w-full">{children}</div>;
};

export default HomepageWrapper;
