import { forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormSelectBoxProps<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  children: React.ReactNode;
}

const FormSelectBox = forwardRef(
  <T extends FieldValues>(
    { name, children, control }: FormSelectBoxProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ): JSX.Element => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            className="form-select w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
            {...field}
          >
            {children}
          </select>
        )}
      />
    );
  }
);

export default FormSelectBox;
