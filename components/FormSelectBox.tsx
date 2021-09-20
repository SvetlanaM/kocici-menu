import { forwardRef } from 'react';

interface FormSelectBoxProps {
  children: React.ReactNode;
}
const FormSelectBox = forwardRef<HTMLInputElement, FormSelectBoxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children }: FormSelectBoxProps, ref): JSX.Element => {
    return (
      <select
        className="form-select w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
      >
        {children}
      </select>
    );
  }
);

export default FormSelectBox;
