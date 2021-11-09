interface ContainerProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div className="h-screen overflow-y-hidden block xl-custom:flex font-sans tracking-wide">
      {children}
    </div>
  );
};

export default Layout;
