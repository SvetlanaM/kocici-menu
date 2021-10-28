type ContainerProps = {
  children: React.ReactNode;
};

export const checkProductURL = (): boolean => {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    return (
      url.includes('products') ||
      url.includes('dashboard') ||
      url.includes('my-cats')
    );
  }
  return false;
};

const CenterContainer = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div
      className={`w-full xl-custom:w-9/12 xl-custom:mt-0 ${
        checkProductURL()
          ? 'order-2 mt-0 lg:order-1'
          : 'order-1 mt-16 lg:order-2'
      }`}
    >
      {children}
    </div>
  );
};

export default CenterContainer;
