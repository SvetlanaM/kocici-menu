const Container = ({ children, flexType }) => {
  return <section className={`${flexType} flex mt-9.5`}>{children}</section>;
};

export default Container;
