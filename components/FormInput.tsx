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
      registerRules,
    }: FormInputProps,
    ref
  ): JSX.Element => {
    return (
      <input
        ref={ref}
        className={`form-input mb-3 mt-2 text-purple block focus:border border-rounded-base focus:bg-white focus:outline-none placeholder-gray ${width} ${
          errors
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
            : 'border-gray focus:border-gray focus:ring-gray focus:ring-opacity-50'
        }`}
        type={type}
        {...registerRules}
        placeholder={placeholder}
        value={defaultValue}
        step={step}
        name={name}
        autoComplete="on"
      />
    );
  }
);

export default FormInput;
