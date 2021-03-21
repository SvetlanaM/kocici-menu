const Container = ({ children }) => {
  return (
    <div className="w-full flex h-screen overflow-y-hidden">{children}</div>
  );
};

export default Container;
