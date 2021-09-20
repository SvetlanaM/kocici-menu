interface FormInputWrapperProps {
  children: React.ReactNode;
}

const FormInputWrapper = ({ children }: FormInputWrapperProps): JSX.Element => (
  <div className="flex flex-col w-full mb-1"> {children}</div>
);

export default FormInputWrapper;
