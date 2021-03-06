import { useEffect } from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

export const checkProductURL = (): boolean => {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    if (url.includes('products')) {
      return true;
    }
  }

  return true;
};

const CenterContainer = ({ children }: ContainerProps): JSX.Element => {
  useEffect(() => {
    checkProductURL();
  }, []);

  return (
    <div
      className={`w-full xl-custom:w-9/12 xl-custom:mt-0 ${
        checkProductURL() ? 'order-2 lg:mt-12 lg:order-1' : 'order-1 lg:order-1'
      }`}
    >
      {children}
    </div>
  );
};

export default CenterContainer;
