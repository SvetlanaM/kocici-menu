const Container = ({ children }) => {
  return (
    <div className="w-full h-screen flex overflow-y-hidden">{children}</div>
  );
};

export default Container;
