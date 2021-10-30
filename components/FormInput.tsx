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
  registerRules?: UseFormRegisterReturn;
  passClass?: string;
  onClick?: (e) => void;
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
      passClass,
      onClick,
    }: FormInputProps,
    ref
  ): JSX.Element => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={`w-full form-input mb-3 mt-2 text-purple block focus:border border-rounded-base focus:bg-white focus:outline-none placeholder-gray ${width} ${
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
        {passClass && (
          <img
            src=""
            className={`${passClass} absolute pass`}
            onClick={onClick}
          />
        )}
      </div>
    );
  }
);

export default FormInput;
