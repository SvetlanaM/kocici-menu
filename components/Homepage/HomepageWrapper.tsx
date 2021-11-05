type HomepageWrapperProps = {
  children: React.ReactNode;
};

const HomepageWrapper = ({ children }: HomepageWrapperProps): JSX.Element => {
  return <div className="flex">{children}</div>;
};

export default HomepageWrapper;
