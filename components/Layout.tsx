import Meta from './Meta';

type ContainerProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ContainerProps) => {
  return (
    <>
      <div className="min-h-screen block xl-custom:flex font-sans tracking-wide">
        {children}
      </div>
    </>
  );
};

export default Layout;
