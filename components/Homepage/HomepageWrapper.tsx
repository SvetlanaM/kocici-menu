type HomepageWrapperProps = {
  children: React.ReactNode;
};

const HomepageWrapper = ({ children }: HomepageWrapperProps): JSX.Element => {
  return <div className="flex container-width">{children}</div>;
};

export default HomepageWrapper;
