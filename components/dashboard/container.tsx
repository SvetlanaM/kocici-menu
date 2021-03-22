const Container = ({ children, flexType }) => {
  return <section className={`flex ${flexType} mt-9.5`}>{children}</section>;
};

export default Container;
