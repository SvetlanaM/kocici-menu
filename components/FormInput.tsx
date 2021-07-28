interface FormInputProps {
  registerRules?: any;
  errors?: any;
  type: string;
  placeholder?: string;
  defaultValue?: any;
  width?: string;
  onChange?: (e) => void;
}

const FormInput = ({
  registerRules,
  errors,
  type,
  placeholder,
  defaultValue,
  width,
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
    ></input>
  );
};

export default FormInput;