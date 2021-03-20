const Container = ({ children }) => {
  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      {children}
    </div>
  );
};

export default Container;
