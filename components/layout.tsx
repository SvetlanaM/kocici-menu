import Meta from './meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex font-sans tracking-wide">
        {children}
      </div>
    </>
  );
};

export default Layout;
