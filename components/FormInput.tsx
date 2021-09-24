import { forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  errors?: FieldError;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  width?: string;
  step?: number;
  onChange?: (e) => void;
  name?: string;
  required?: boolean;
  registerRules: UseFormRegisterReturn;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      errors,
      type,
      placeholder,
      defaultValue,
      width,
      name,
      step,
      onChange,
      registerRules,
    }: FormInputProps,
    ref
  ): JSX.Element => {
    return (
      <input
        ref={ref}
        className={`form-input mb-3 mt-2 text-purple block border-rounded-base ${width} ${
          errors ? 'border-red-400' : 'border-gray'
        }
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray`}
        type={type}
        {...registerRules}
        placeholder={placeholder}
        onChange={onChange}
        value={defaultValue}
        step={step}
        name={name}
        autoComplete="on"
      />
    );
  }
);

export default FormInput;
