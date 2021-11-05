import { checkProductURL } from './Containers/CenterContainer';

interface ContainerProps {
  children: React.ReactNode;
}

const LeftContainer = ({ children }: ContainerProps): JSX.Element => {
  return (
    <div
      className={`w-full  lg:pt-0 xl-custom:pt-0 xl-custom:w-3/12 xl-custom:pl-7 ${
        checkProductURL()
          ? 'order-1 lg:order-2 pt-0'
          : 'order-2 lg:order-1 pt-10 lg:pt-5'
      }`}
    >
      {children}
    </div>
  );
};

export default LeftContainer;
