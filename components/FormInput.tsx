interface FormInputProps {
  registerRules?: any;
  errors?: any;
  type: string;
  placeholder?: string;
  defaultValue?: any;
  width?: string;
  step?: number;
  onChange?: (e) => void;
  name?: string;
}

const FormInput = ({
  registerRules,
  errors,
  type,
  placeholder,
  defaultValue,
  width,
  name,
  step,
  onChange,
}: FormInputProps) => {
  return (
    <input
      {...registerRules}
      className={`form-input mb-3 mt-2 text-purple block border-rounded-base ${width} ${
        errors ? 'border-red-400' : 'border-gray'
      }
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray`}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      value={defaultValue}
      step={step}
      name={name}
      autoComplete="on"
      onFocus={onChange}
    />
  );
};

export default FormInput;
